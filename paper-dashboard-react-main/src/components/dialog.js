import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import FileBase64 from 'react-file-base64';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {MaS,MaPL, TenS, HinhBia, TomTat, Link,NgayXuatBan,NhaXuatBan,TenTacGia,NgayTao,NguoiTao,NgaySua,NguoiSua}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{MaS?"Sửa thông tin":"Thêm sách mới"}</DialogTitle>
        <DialogContent>
         <form>
         <TextField type='text' id="MaPL" value={MaPL} onChange={e=>onChange(e)} placeholder="Nhập mã phân loại" label="Mã Phân Loại" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="TenS" value={TenS} onChange={e=>onChange(e)} placeholder="Nhập tên sách" label="Tên Sách" variant="outlined" margin="dense" fullWidth />
             <FileBase64 id="HinhBia" value={HinhBia} onDone={e => onChange(e)} placeholder="Hình bìa" label="Hình Bìa" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="TomTat" value={TomTat} onChange={e=>onChange(e)} placeholder="Tóm tắt" label="Tóm Tắt" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="Link" value={Link} onChange={e=>onChange(e)} placeholder="Nhập Link" label="Link" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="NgayXuatBan" value={NgayXuatBan} onChange={e=>onChange(e)} placeholder="" label="Ngày Xuất Bản" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="NhaXuatBan" value={NhaXuatBan} onChange={e=>onChange(e)} placeholder="" label="Nhà Xuất Bản" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id="TenTacGia" value={TenTacGia} onChange={e=>onChange(e)} placeholder="" label="Tên Tác Giả" variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id={MaS?"NgaySua":"NgayTao"} value={MaS?`${NgaySua}`:`${NgayTao}`} onChange={e=>onChange(e)} placeholder="" label={MaS?"Ngày Sửa":"Ngày Tạo"} variant="outlined" margin="dense" fullWidth />
             <TextField type='text' id={MaS?"NguoiSua":"NguoiTao"} value={MaS?`${NguoiSua}`:`${NguoiTao}`} onChange={e=>onChange(e)} placeholder="" label={MaS?"Người Sửa":"Người Tạo"} variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {MaS?"Sửa":"Xác Nhận"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
