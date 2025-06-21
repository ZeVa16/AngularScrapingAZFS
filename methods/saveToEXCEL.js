import XLSX from "xlsx";

export function saveToExcel(data, filename) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Articulos");
    XLSX.writeFile(wb, `./data/${filename}.xlsx`);
}