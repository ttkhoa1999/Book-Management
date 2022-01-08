const config = require('./dbConfig'),
      sqlConnection = require('mssql');

const getAllbook = async()=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query("SELECT * FROM Sach")
        return all;
    }catch(error){
        console.log(error);
    }
}

const getAllbookPL = async()=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query("SELECT * FROM PhanLoaiSach")
        return all;
    }catch(error){
        console.log(error);
    }
}

const getbook = async(ID)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`SELECT * FROM Sach where MaS = '${ID}'`)
        return all;
    }catch(error){
        console.log(error);
    }
}

const addbook = async(book)=>{
    try{
        let pool = await sqlConnection.connect(config);
        console.log('book', book);
        let all = await pool.request().query(`INSERT INTO Sach VALUES('${book.MaPL}', N'${book.TenS}',' ${book.HinhBia}', N'${book.TomTat}', '${book.Link}', '${book.NgayXuatBan}', N'${book.NhaXuatBan}', N'${book.TenTacGia}','${book.DaXoa}', '${book.NgayTao}', N'${book.NguoiTao}','${book.NgaySua}', N'${book.NguoiSua}','${book.NgayXoa}', N'${book.NguoiXoa}')`);
    }catch(error){
        console.log(error);
    }
}

const addbookPL = async(book)=>{
    try{
        let pool = await sqlConnection.connect(config);
        console.log('bookpl', book);
        let all = await pool.request().query(`INSERT INTO PhanLoaiSach VALUES('${book.MaPL}',N'${book.TenPL}','${book.DaXoa}', '${book.NgayTao}',N'${book.NguoiTao}','${book.NgaySua}', N'${book.NguoiSua}','${book.NgayXoa}', N'${book.NguoiXoa}')`);
    }catch(error){
        console.log(error);
    }
}
const delbook = async(ID)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`DELETE FROM Sach where MaS = '${ID}'`);
    }catch(error){
        console.log(error);
    }
}

const delbookPL = async(ID)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`DELETE FROM PhanLoaiSach where MaPL = '${ID}'`);
    }catch(error){
        console.log(error);
    }
}

const updatebook = async(ID, book)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`UPDATE Sach SET MaPL = '${book.MaPL}', TenS = N'${book.TenS}', HinhBia =' ${book.HinhBia}', TomTat = N'${book.TomTat}', Link = '${book.Link}', NgayXuatBan = '${book.NgayXuatBan}', NhaXuatBan = N'${book.NhaXuatBan}', TenTacGia = N'${book.TenTacGia}', NgaySua = '${book.NgaySua}', NguoiSua = N'${book.NguoiSua}' where MaS = '${ID}'`);
    }catch(error){
        console.log(error);
    }
}

const updatebookPL = async(ID, book)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`UPDATE PhanLoaiSach SET TenPL = N'${book.TenPL}', DaXoa = '${book.DaXoa}', NgayTao = '${book.NgayTao}', NguoiTao = N'${book.NguoiTao}', NgaySua = '${book.NgaySua}', NguoiSua = N'${book.NguoiSua}', NgayXoa = '${book.NgayXoa}', NguoiXoa = N'${book.NguoiXoa}' where MaPL = '${ID}'`);
    }catch(error){
        console.log(error);
    }
}

const getPT = async(book)=>{
    try{
        let pool = await sqlConnection.connect(config);
        let all = await pool.request().query(`exec PhanTrang_Offset '${book.number}', '${book.pagesize}'`);
    }catch(error){
        console.log(error);
    }
}

module.exports ={
    getAllbook,
    getbook,
    addbook,
    delbook,
    updatebook,
    getAllbookPL,
    addbookPL,
    delbookPL,
    updatebookPL,
    getPT
}
