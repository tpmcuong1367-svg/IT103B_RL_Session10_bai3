const MAX_DAYS = 14;
const FINE_PER_DAY = 5000;

const borrowRecords = [
  { recordId: "PM01", studentId: "SV101", bookTitle: "JavaScript Basics", borrowDays: 10, isReturned: false },
  { recordId: "PM02", studentId: "SV102", bookTitle: "Database Design",   borrowDays: 16, isReturned: false },
  { recordId: "PM03", studentId: "SV103", bookTitle: "Algorithms",        borrowDays: 12, isReturned: true }
];
console.log("=== 0. KHỞI TẠO ===");
console.log(`Đã tạo mảng borrowRecords gồm ${borrowRecords.length} phiếu mượn.`);

console.log("\n=== 1. CREATE: THÊM PHIẾU MỚI ===");
const newRecord = {
  recordId: "PM04",
  studentId: "SV104",
  bookTitle: "Clean Code",
  borrowDays: 18,
  isReturned: false
};
borrowRecords.push(newRecord);
console.log(`Đã thêm phiếu ${newRecord.recordId} cho ${newRecord.studentId} mượn "${newRecord.bookTitle}".`);
console.log(`Tổng số phiếu hiện tại: ${borrowRecords.length}`);

console.log("\n=== 2. READ: TÍNH PHÍ PHẠT QUÁ HẠN (> 14 ngày) ===");
let totalFine = 0;
for (let i = 0; i < borrowRecords.length; i++) {
  const r = borrowRecords[i];
  if (r.borrowDays > MAX_DAYS) {
    const fine = (r.borrowDays - MAX_DAYS) * FINE_PER_DAY;
    totalFine += fine;
    console.log(`${r.recordId} - ${r.studentId}: quá hạn ${r.borrowDays - MAX_DAYS} ngày, phạt ${fine} VNĐ`);
  } else {
    console.log(`${r.recordId} - ${r.studentId}: còn trong hạn, không phạt`);
  }
}
console.log(`Tổng phí phạt phát sinh: ${totalFine} VNĐ`);

console.log("\n=== 3. UPDATE: CẬP NHẬT TRẢ SÁCH PM01 ===");
for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === "PM01") {
    borrowRecords[i].isReturned = true;
    console.log(`Phiếu PM01 đã được cập nhật isReturned = ${borrowRecords[i].isReturned}`);
  }
}

console.log("\n=== 4. DELETE: XÓA PHIẾU PM03 ===");
let deleteIndex = -1;
for (let i = 0; i < borrowRecords.length; i++) {
  if (borrowRecords[i].recordId === "PM03") {
    deleteIndex = i;
  }
}
if (deleteIndex !== -1) {
  borrowRecords.splice(deleteIndex, 1);
  console.log(`Đã xóa phiếu PM03 (vị trí ${deleteIndex}). Còn lại ${borrowRecords.length} phiếu.`);
} else {
  console.log("Không tìm thấy phiếu PM03 để xóa.");
}

console.log("\n=== BẢNG TỔNG KẾT PHIẾU MƯỢN ===");
console.log("┌────────┬──────────┬────────────────────┬───────────┬────────────┬────────────┐");
console.log("│ Mã     │ Sinh viên│ Tên sách           │ Số ngày   │ Trả sách   │ Tiền phạt  │");
console.log("├────────┼──────────┼────────────────────┼───────────┼────────────┼────────────┤");

let finalFine = 0;
let notReturned = 0;
for (let i = 0; i < borrowRecords.length; i++) {
  const r = borrowRecords[i];
  let fine = 0;
  if (r.borrowDays > MAX_DAYS) {
    fine = (r.borrowDays - MAX_DAYS) * FINE_PER_DAY;
  }
  finalFine += fine;
  if (r.isReturned === false) {
    notReturned++;
  }
  const returnedText = r.isReturned ? "Đã trả" : "Chưa trả";
  console.log(
    `│ ${r.recordId.padEnd(6)} │ ${r.studentId.padEnd(8)} │ ${r.bookTitle.padEnd(18)} │ ${String(r.borrowDays).padStart(9)} │ ${returnedText.padEnd(10)} │ ${String(fine).padStart(10)} │`
  );
}

console.log("└────────┴──────────┴────────────────────┴───────────┴────────────┴────────────┘");
console.log(`Tổng số phiếu còn lại : ${borrowRecords.length}`);
console.log(`Số phiếu chưa trả sách: ${notReturned}`);
console.log(`Tổng phí phạt         : ${finalFine} VNĐ`);
