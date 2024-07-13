import { parse } from 'csv-parse/sync';

export interface RentalData {
  date: string;
  price: number;
}

export function parseCSV(csvContent: string, cityName: string): RentalData[] {
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true
  });

  const cityData: RentalData[] = [];
  const cityColumn = records[0][cityName];

  if (!cityColumn) {
    throw new Error(`City "${cityName}" not found in CSV data`);
  }

  for (const record of records) {
    const date = record.RegionName;
    const price = parseFloat(record[cityName]);

    if (date && !isNaN(price) && date.startsWith('20')) {  // Only include data from 2020 onwards
      cityData.push({ date, price });
    }
  }

  return cityData;
}