


window.addEventListener('load', () => {
    const products = getItemInLocalStorage('newProduct')
    console.log(products);
    setCartHTML ()
    
    renderYourCart ()

   
    const productHTML = document.getElementById('products')
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const div = document.createElement('div')
        div.classList.add('card')
        const a = document.createElement('a')
        a.classList.add('product-item')
        const img = document.createElement('img')
        img.src=product.nsx
        img.style.width='300px'
        img.style.height='200px'
        const h1 = document.createElement('h1')
        h1.innerText= product.name
        const p = document.createElement('p')
        p.classList.add('price')
        p.innerText = product.price
        const p1 = document.createElement('p')
        p1.innerText = product.status
        const p2 = document.createElement('p')
        const button = document.createElement('button')
        button.innerText="Add to Cart"
        button.addEventListener('click',()=>{
            const cart = getItemInLocalStorage('cart')
            const productFind = cart.find(item => item.id === product.id)
            if (productFind){
                const newCart = cart.map(item => {
                    if( item.id === productFind.id){
                        item.counter += 1
                    }
                    return item
                })
                setItemInLocalStorage("cart", newCart)
            }else {
                cart.push({...product, counter:1})
                setItemInLocalStorage('cart',cart)
                
            }
            setCartHTML ()
            })

        div.appendChild(a)
        a.appendChild(img)
        a.appendChild(h1)
        a.appendChild(p)
        a.appendChild(p1)
        a.appendChild(p2)
        p2.appendChild(button)

        productHTML.appendChild(div)
    }
})


function getItemInLocalStorage(key) {
    const itemInLocal = localStorage.getItem(key)
    const result = JSON.parse(itemInLocal)  
    return result ?? []
}
function setItemInLocalStorage (key, value) {
    const stringData = JSON.stringify(value)
    localStorage.setItem(key , stringData)
}

function setCartHTML (){
    const productCart = getItemInLocalStorage('cart')
    const lengthProductCart = productCart.length
    let sum = 0;
    for (let i = 0; i < productCart.length; i++) {
        const product = productCart[i];
        sum += product.counter
    }
    const cartCounter = document.getElementById('cart-number')
    cartCounter.innerText = sum

}


window.addEventListener('load', () => {
    const cartList = getItemInLocalStorage('cart')
    for (let i = 0; i < cartList.length; i++) {
        const product = cartList[i];

        const tr = document.createElement('tr')
        const td01 = document.createElement('td')
        td01.innerText = product.name
        const img = document.createElement('img')
        img.src = product.nsx
        img.style.width = '100px'
        const p = document.createElement('p')
        const td02 = document.createElement('td')
        td02.innerText = product.status
        const td03 = document.createElement('td')
        const td04 = document.createElement('td')
        

        tr.appendChild(td01)
        td01.appendChild(img)
        td01.appendChild(p)
        tr.appendChild(td02)
        tr.appendChild(td03)
        tr.appendChild(td04)

    }
})

function renderYourCart () {
    let listProduct = localStorage.getItem('newProduct') ? JSON.parse(localStorage.getItem('newProduct')) : []

    let products = `<tr>
    <th>ID</th>
    <th>Product</th>
    
    <th>Giá Tiền</th>
    <th>Số lượng</th>
    <th>Action</th>
    
  </tr>
    `
    listProduct.map((value,index) => {
        products += `<tr>
        <th>${index + 1}</th>
        <th> ${value.name} </th>
        
        <th>${value.price}</th>
        <th> <span >+</span> 1 <span> -</span></th>
        <th><i class="fa-solid fa-pen" onclick = "editProduct(${index})"></i>  <span></span> <i class="fa-solid fa-trash-can" onclick = "deleteProduct(${index})"></i></i></th>
     
        
      </tr>
        `
    })

    document.getElementById('tableContent').innerHTML = products
}


        

    
    
    
    
