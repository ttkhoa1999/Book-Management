import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, Button } from '@material-ui/core';
import FormDialog from '../components/dialog';
import FormDialogPL from '../components/dialogPL';

const initialValue = {MaPL:'', TenS: '', HinhBia: '', TomTat: '', Link: '',NgayXuatBan: '',NhaXuatBan: '',TenTacGia: '',DaXoa: '0',NgayTao: '',NguoiTao: '',NgaySua: '',NguoiSua: '',NgayXoa: '',NguoiXoa: ''}
const initialValuePL = {MaP: '',MaPL:'', TenPL: '',DaXoa: '0',NgayTao: '',NguoiTao: '',NgaySua: '',NguoiSua: '',NgayXoa: '',NguoiXoa: ''}

function Tables() {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)
  const [tableDataPL, setTableDataPL] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [openPL, setOpenPL] = React.useState(false);
  const [formData, setFormData] = useState(initialValue)
  const [formDataPL, setFormDataPL] = useState(initialValuePL)
  // const [search, setSearch] = useState("")
  // const [ filter, setFilter ] = useState([]);
  //const cc = filter.length != 0 ? filter : tableData;
  const [pageSize, setPageSize] = useState(2);
  const [pageSizePL, setPageSizePL] = useState(2);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenPL = () => {
    setOpenPL(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue)
  };

  const handleClosePL = () => {
    setOpenPL(false);
    setFormDataPL(initialValuePL)
  };

  const url = `http://localhost:5000`
  const columnDefs = [
    { headerName: "Mã Sách", field: "MaS" },
    { headerName: "Mã Phân Loại", field: "MaPL" },
    { headerName: "Tên Sách", field: "TenS", },
    { headerName: "Hình Bìa", field: "HinhBia" , cellRendererFramework:(param) =><div><img style={{width:'80px', height:'100px',padding: '5px', borderRadius:'10px'}}src={param.value} alt="Hình bìa"></img></div>},
    { headerName: "Tóm Tắt", field: "TomTat" },
    { headerName: "Link", field: "Link" },
    { headerName: "Ngày Xuất Bản", field: "NgayXuatBan" },
    { headerName: "Tác Giả", field: "TenTacGia" },
    {
      headerName: "Thao tác", field: "id", floatingFilter: false, cellRendererFramework: (params) => <div>
        <i><img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-edit-mintab-for-ios-becris-lineal-becris.png" style={{width:'35px',height:'35px'}} onClick={() => handleUpdate(params.data)}/></i>|| 
        <i><img src="https://img.icons8.com/flat-round/64/000000/delete-sign.png" style={{width:'40px',height:'40px',padding: '2px'}} onClick={() => handleDelete(params.data.MaS)}/></i>
      </div>
    }
  ]

  useEffect(() => {
    getBooks()
    getPL()
  }, [])

  const getBooks = () => {
    axios({method: 'get', url: url + `/api`,}).then(res => {if(res.data){setTableData(res.data);}})
  }
  
  const onChange = (e) => {
    if(e.type != 'change' ){
       setFormData({...formData, HinhBia: e.base64})
      }else{
        const { value, id } = e.target;
        setFormData({ ...formData, [id]: value })
    }  
  }

  const onGridReady = (params) => {
    setGridApi(params);
  }

  const handleUpdate = (oldData) => {
    setFormData(oldData)
    handleClickOpen()
  }

  const handleUpdatePL = (oldData) => {
    setFormDataPL(oldData)
    handleClickOpenPL()
  }

  const handleDelete = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa không ?", id)
    if (confirm) {axios({method: 'delete', url: url+ `/delData`, data: {id : id,}}).then(res => {if (res.data) {getBooks();}})}
  }

  const handleFormSubmit = () => {
    if (formData.MaS) {
      const confirm = window.confirm("Bạn có chắc muốn cập nhập không ?")
      axios({method: 'PUT', url: url + `/updateData`, data: {id : formData.MaS,data : formData}}).then(res => {if(res.data){handleClose();getBooks()}})
    } else {
      axios({method: 'post', url: url + `/postData`, data: {data : formData,} }).then(res => {if (res.data) {handleClose();getBooks()}})}
  }

  const columnDefsPL = [
    { headerName: "Mã Phân Loại", field: "MaPL" },
    { headerName: "Tên Phân Loại", field: "TenPL", },
    { headerName: "Đã Xóa", field: "DaXoa"},
    { headerName: "Ngày Tạo", field: "NgayTao" },
    { headerName: "Người Tạo", field: "NguoiTao" },
    { headerName: "Ngày Sửa", field: "NgaySua" },
    { headerName: "Người Sửa", field: "NguoiSua" },
    { headerName: "Ngày Xóa", field: "NgayXoa" },
    { headerName: "Người Xóa", field: "NguoiXoa" },
    {
      headerName: "Thao tác", field: "id", floatingFilter: false, cellRendererFramework: (params) => <div>
        <i><img src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-edit-mintab-for-ios-becris-lineal-becris.png" style={{width:'35px',height:'35px'}} onClick={() => handleUpdatePL(params.data)}/></i>|| 
        <i><img src="https://img.icons8.com/flat-round/64/000000/delete-sign.png" style={{width:'40px',height:'40px',padding: '2px'}} onClick={() => handleDeletePL(params.data.MaPL)}/></i>
      </div>
    }
  ]

  const getPL = () => {
    axios({method: 'get', url: url + `/apiPL`,}).then(res => {if(res.data){setTableDataPL(res.data)}})
  }

  const onChangePL = (e) => {
    let { value, id } = e.target;
    setFormDataPL({ ...formDataPL, [id]: value })
  }

  const handleDeletePL = (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa không ?", id)
    if (confirm) {axios({method: 'delete', url: 'http://localhost:5000/delDataPL', data: {id : id,}}).then(res => {if (res.data) {getPL();}})}
  }

  const handleFormSubmitPL = () => {
    if (formDataPL.MaP) {
      const confirm = window.confirm("Bạn có chắc muốn cập nhập không ?")
      axios({method: 'PUT', url: 'http://localhost:5000/updateDataPL', data: {id : formDataPL.MaPL,data : formDataPL}}).then(res => {if(res.data){handleClosePL();getPL()}})
    } else {
      axios({method: 'post', url: 'http://localhost:5000/postDataPL', data: {data : formDataPL,}}).then(res => {if (res.data) {handleClosePL();getPL()}})}
  }
  // function searchChange(e){
  //   setSearch(e.target.value);
  //   let dbFilter = tableData.filter((item) => item.TenS.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
  //   setFilter({...filter, dbFilter});
  //   console.log(filter);
  // }
  const onChangePageSize = (e) => {
    setPageSize(e.target.value)
  }

  const onChangePageSizePL = (e) => {
    setPageSizePL(e.target.value)
  }

  const defaultColDef = {
    sortable: true, flex: 1, filter: true, floatingFilter: false, autoHeight: true,
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Quản lý sách</CardTitle>
              </CardHeader>
              <CardBody>
              <label align="left">Hiển thị 
                    <select style={{margin:'5px'}} value={pageSize} onChange={onChangePageSize}>
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={6}>6</option>
                    </select>
                    mục
                  </label>
                <Grid align="right" >
                  <Button  variant="contained" color="primary" onClick={handleClickOpen}><i className="nc-icon nc-simple-add" style={{marginRight: '10px'}}/> Thêm sách</Button>
                </Grid>
                <div className="ag-theme-alpine" style={{textAlign:'left', marginTop:'10px', height: '495px' }}>
                  <AgGridReact 
                    rowData={tableData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination = {true}
                    paginationPageSize={pageSize}
                  />
                </div>
                  <FormDialog open={open} handleClose={handleClose}
                    data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Quản lý phân loại sách</CardTitle>
              </CardHeader>
              <CardBody>
                 <label align="left">Hiển thị 
                    <select style={{margin:'5px'}} value={pageSizePL} onChange={onChangePageSizePL}>
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={6}>6</option>
                    </select>
                    mục
                  </label>
                <Grid align="right" >
                  <Button  variant="contained" color="primary" onClick={handleClickOpenPL}><i className="nc-icon nc-simple-add" style={{marginRight: '10px'}}/>Thêm loại sách</Button>
                </Grid>
                <div className="ag-theme-alpine" style={{textAlign:'left', marginTop:'10px', height: '495px' }}>
                  <AgGridReact
                    rowData={tableDataPL}
                    columnDefs={columnDefsPL}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                    pagination = {true}
                    paginationPageSize={pageSizePL}
                  />
                </div>
                  <FormDialogPL open={openPL} handleClose={handleClosePL}
                    data={formDataPL} onChange={onChangePL} handleFormSubmit={handleFormSubmitPL} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
