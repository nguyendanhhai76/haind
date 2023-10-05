
const closeFormSignUp = document.querySelector('.close-form-signup')
const signUp = document.querySelector('.signup ')
const openFormSignup = document.querySelector('.js-auth-form-signup')

function addClass (){
    openFormSignup.classList.add('show')
    hideForm()
}

function removeClass () {
    openFormSignup.classList.remove('show')
    
}

signUp.addEventListener('click', addClass)
closeFormSignUp.addEventListener('click', removeClass)

const login = document.querySelector('.login ')
const openFormLogin = document.querySelector('.js-auth-form-login');
const closeFormLogin = document.querySelector('.close-form-login')

function showForm () {
    openFormLogin.classList.add('show')
    removeClass ()
}
    login.addEventListener('click', showForm)


function hideForm () {
    openFormLogin.classList.remove('show')
    
}
closeFormLogin.addEventListener('click', hideForm)


// CRUD-Products

function validateInput (){
    let formElement = document.querySelector('.input-product')
    let inputElement = formElement.querySelectorAll('.input-addproduct')

    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            alert('Không để ô trống?')
            return;
        } 
        
    }
    const productName = document.getElementById("product-name").value
    const productNSX = document.getElementById("product-nsx").value
    const productPrice = document.getElementById("product-price").value
    const productStatus = document.getElementById("product-status").value
    // const productImg = document.getElementById("product-img").value

    let newProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []
    newProduct.push({
        name :productName,
        nsx : productNSX,
        price : productPrice,
        status : productStatus,
        // img : productImg,
    })
       localStorage.setItem('newProduct',JSON.stringify(newProduct))
       renderProduct ();
       resetInput ()

}

function renderProduct () {
    let listProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []

    let products = `<tr>
    <th>ID</th>
    <th>Product</th>
    <th>Hình ảnh</th>
    <th>Giá Tiền</th>
    <th>Tràng Thái</th>
    <th>Action</th>
    
  </tr>
    `
    listProduct.map((value,index) => {
        products += `<tr>
        <th>${index + 1}</th>
        <th> ${value.name} </th>
        <th>${value.nsx}</th>
        <th>${value.price}</th>
        <th>${value.status}</th>
        <th><i class="fa-solid fa-pen" onclick = "editProduct(${index})"></i> <i class="fa-solid fa-trash-can" onclick = "deleteProduct(${index})"></i></i></th>
     
        
      </tr>
        `
    })

    document.getElementById('addproduct').innerHTML = products
}

function editProduct(index) {
    let listProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []
    document.getElementById("product-name").value = listProduct[index].name
    document.getElementById("product-nsx").value = listProduct[index].nsx
    document.getElementById("product-price").value = listProduct[index].price
    document.getElementById("product-status").value = listProduct[index].status

    document.getElementById("index").value = index
    document.querySelector(".btn-add").classList.add('hide')
    document.getElementById("update").style.display = "inline-block"
}

function changeProduct(){
    let listProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []
    let index = document.getElementById('index').value
    listProduct[index] = {
        name :document.getElementById("product-name").value,
        nsx : document.getElementById("product-nsx").value,
        price : document.getElementById("product-price").value,
        status : document.getElementById("product-status").value,
    }
    localStorage.setItem('newProduct',JSON.stringify(listProduct))
    renderProduct();
    resetInput ()
    
}

function resetInput (){
    document.getElementById("product-name").value = ""
    document.getElementById("product-nsx").value = ""
    document.getElementById("product-price").value ="" 
    document.getElementById("product-status").value ="" 

    document.querySelector(".btn-add").classList.remove('hide')
    document.getElementById("update").style.display = "none"
   
}

function deleteProduct(index) {
    let listProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []
    if(confirm('Bạn muốn xóa sản phẩm này ?')){
        listProduct.splice(index, 1)
    }
    localStorage.setItem('newProduct',JSON.stringify(listProduct))
    renderProduct()

}




 
// login-signup


function signup (e) {
    
    let user = document.getElementById('user').value
    let pass = document.getElementById('pass').value
    let pass2 = document.getElementById('pass2').value
    let users = {
    userName : user,
    password : pass,
    } 
     
  const json = JSON.stringify(users)
  localStorage.setItem('user', json)
  alert('Đăng kí thành công')
  showForm ()

}

function checkLogin (e){
    
    let userName = document.getElementById('userLogin').value
    let password = document.getElementById('passLogin').value
    let user = localStorage.getItem('user')
    let data = JSON.parse(user);
    if (userName == "" || password == ""){
        alert ('Vui lòng nhập tài khoản và mật khẩu. ')
        return
        
    }else if (userName == data.userName && password == data.password){
        alert('Đăng nhập thành công')
        document.querySelector('.login-signup').style.display = 'none'
        hideForm () 
    }else {
        alert('Đăng nhập thất bại')
    }


}





