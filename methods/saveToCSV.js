import fs from "fs";
import { Parser as Json2csvParser } from "json2csv";

export function saveToCSV(data, filename) {
    const fields = Object.keys(data[0]);
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(data);
    fs.writeFileSync(`./data/${filename}.csv`, csv, "utf-8");
}