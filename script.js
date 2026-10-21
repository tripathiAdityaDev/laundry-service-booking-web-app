

const cartItems = document.getElementById("cart-items");
const totalAmount = document.getElementById("total-amount");

const serviceRows = document.querySelectorAll(".service-row");



serviceRows.forEach(row => {

    const addBtn = row.querySelector(".add-btn");
    const quantityControl = row.querySelector(".quantity-control");

    const plusBtn = row.querySelector(".plus-btn");
    const minusBtn = row.querySelector(".minus-btn");

    const quantity = row.querySelector(".quantity");



    addBtn.addEventListener("click", () => {

        quantity.textContent = 1;

        addBtn.style.display = "none";

        quantityControl.style.display = "flex";

        updateCart();

    });

  

    plusBtn.addEventListener("click", () => {

        let count = Number(quantity.textContent);

        count++;

        quantity.textContent = count;

        updateCart();

    });

   

    minusBtn.addEventListener("click", () => {

        let count = Number(quantity.textContent);

        count--;

        if(count <= 0){

            quantity.textContent = 1;

            quantityControl.style.display = "none";

            addBtn.style.display = "inline-block";

        }else{

            quantity.textContent = count;

        }

        updateCart();

    });

});




function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    let hasItems = false;

    serviceRows.forEach(row=>{

        const addBtn = row.querySelector(".add-btn");

        // Ignore services not added
        if(addBtn.style.display !== "none"){

            return;

        }

        hasItems = true;

        const name =
        row.querySelector(".service-name").textContent;

        const price =
        parseFloat(
            row.querySelector(".price")
            .textContent
            .replace("₹","")
        );

        const quantity =
        Number(
            row.querySelector(".quantity").textContent
        );

        const cost = price * quantity;

        total += cost;

        const item = document.createElement("p");

        item.textContent =
        `${name} × ${quantity} = ₹${cost.toFixed(2)}`;

        cartItems.appendChild(item);

    });

    if(!hasItems){

        cartItems.innerHTML =
        "No Service Selected";

    }

    totalAmount.textContent =
    `₹${total.toFixed(2)}`;

}

const bookBtn = document.querySelector(".book-btn");

const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");

bookBtn.addEventListener("click", function () {

    message.textContent = "";
    message.className = "";

    if(fullName.value.trim()===""){

        message.textContent="Please enter your name.";
        message.classList.add("error");
        return;

    }

    if(email.value.trim()===""){

        message.textContent="Please enter your email.";
        message.classList.add("error");
        return;

    }

    if(phone.value.trim()===""){

        message.textContent="Please enter your phone number.";
        message.classList.add("error");
        return;

    }

    if(totalAmount.textContent==="₹0.00"){

        message.textContent="Please select at least one service.";
        message.classList.add("error");
        return;

    }

    let services = "";

    document.querySelectorAll("#cart-items p").forEach(item=>{

        services += item.textContent + "\n";

    });

    const templateParams = {

        name: fullName.value,

        email: email.value,

        phone: phone.value,

        services: services,

        total: totalAmount.textContent

    };

    emailjs.send(

        "asssignment-tute-4th",

        "template_hsrlc49",

        templateParams

    )

    .then(function(){

        message.textContent =
        "Thank you For Booking the Service. We will get back to you soon!";

        message.classList.add("success");

        fullName.value = "";
        email.value = "";
        phone.value = "";

        resetCart();

    })



    .catch(function(error){

        message.textContent =
        "Failed to send booking email.";

        message.classList.add("error");

        console.log(error);

    });

});

function resetCart(){

    serviceRows.forEach(row=>{

        row.querySelector(".add-btn").style.display="inline-block";

        row.querySelector(".quantity-control").style.display="none";

        row.querySelector(".quantity").textContent=1;

    });

    cartItems.innerHTML="No Service Selected";

    totalAmount.textContent="₹0.00";

}


// --------------------------------- NewsLetter----------------------------------------

const newsletterForm = document.getElementById("newsletterForm");

const subscribeMessage = document.getElementById("subscribe-message");

newsletterForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
    document.getElementById("subscriber-name").value;

    const email =
    document.getElementById("subscriber-email").value;

    if(name === "" || email === ""){

        alert("Please fill all details.");

        return;

    }

    subscribeMessage.textContent =
    "Thank you for subscribing to our newsletter!";

    newsletterForm.reset();

});