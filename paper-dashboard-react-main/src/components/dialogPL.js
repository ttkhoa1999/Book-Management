import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function FormDialog({open,handleClose,data,onChange,handleFormSubmit}) {
 const {MaP, MaPL, TenPL, DaXoa, NgayTao, NguoiTao, NgaySua, NguoiSua}=data

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{MaP?"Sửa thông tin":"Thêm sách mới"}</DialogTitle>
        <DialogContent>
         <form>
            <TextField id="MaPL" value={MaPL} onChange={e=>onChange(e)} placeholder="Nhập mã phân loại" label="Mã Phân Loại" variant="outlined" margin="dense" fullWidth />
             <TextField id="TenPL" value={TenPL} onChange={e=>onChange(e)} placeholder="Nhập tên phân loại" label="Tên Phân Loại" variant="outlined" margin="dense" fullWidth />
             <TextField id="DaXoa" value={DaXoa} onChange={e=>onChange(e)} placeholder="Đã xóa" label="Trạng thái" variant="outlined" margin="dense" fullWidth />
             <TextField id={MaP?"NgaySua":"NgayTao"} value={MaP?`${NgaySua}`:`${NgayTao}`} onChange={e=>onChange(e)} placeholder="" label={MaP?"Ngày Sửa":"Ngày Tạo"} variant="outlined" margin="dense" fullWidth />
             <TextField id={MaP?"NguoiSua":"NguoiTao"} value={MaP?`${NguoiSua}`:`${NguoiTao}`} onChange={e=>onChange(e)} placeholder="" label={MaP?"Người Sửa":"Người Tạo"} variant="outlined" margin="dense" fullWidth />
         </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button  color="primary" onClick={()=>handleFormSubmit()} variant="contained">
            {MaP?"Sửa":"Xác Nhận"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
