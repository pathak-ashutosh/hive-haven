// src/app/api/rental-data/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'City parameter is required' }, { status: 400 });
  }

  try {
    const csvPath = path.join(process.cwd(), 'public', 'data', 'rental_trends.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });

    const cityRecord = records.find((record: any) => record.RegionName === city);

    if (!cityRecord) {
      return NextResponse.json({ error: 'City not found in data' }, { status: 404 });
    }

    const cityData = Object.entries(cityRecord)
      .filter(([key, value]) => key.match(/^\d{4}-\d{2}-\d{2}$/) && key >= '2020-01-31')
      .map(([date, price]) => ({
        date,
        price: parseFloat(price as string) || null
      }))
      .filter((data) => data.price !== null);

    return NextResponse.json(cityData);
  } catch (error) {
    console.error('Error processing CSV:', error);
    return NextResponse.json({ error: 'Error processing data' }, { status: 500 });
  }
}