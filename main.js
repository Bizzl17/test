/*Url */
const requestUrl = 'http://demo.sibers.com/users'

/*AJAX request on server
function to send a get request
*/
/*this request receives data from the server and parses it into json */
/*Checking request status */

function sendRequest (method, url) {

    return new Promise ((resolve, reject) => {

        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'

        xhr.onload = () => {
            if (xhr.status >= 400){
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.responseType)
        }
        
        xhr.send()
    })
}

/*define localSorage */

const raw = localStorage.getItem('contact')
const contactBook = JSON.parse(raw)

/* checking the local storage, if empty,  send a request to the server and  draw,
 if there is an element, then draw*/

if (localStorage.length > 0 ) {
    console.log('заполненно');
    drow()
}else {
    sendRequest('GET', requestUrl)
    .then(contacts => localStorage.setItem('contact', JSON.stringify(contacts)))
    setTimeout(window.location.reload(),1000)

}

    

/*rendering all contacts from localstorage,*/

    function drow () {
        
        /*create a contact layout*/
        let container = document.getElementsByClassName('container__contacts')

        /* loop to draw each contact*/
        for ( let i = 0; i < contactBook.length; i++) {
        
        let containerContacts = document.createElement("div");
        containerContacts.className  = "container__contacts__item";    
        container[0].appendChild(containerContacts);

        
        let contactsImg = document.createElement('img')
        contactsImg.className = 'container__contacts__item-img'
        contactsImg.src = "img.jpg"
        containerContacts.appendChild(contactsImg)
        
        let contactsInfo = document.createElement('div')
        contactsInfo.className = 'container__contacts__item-info'
        containerContacts.appendChild(contactsInfo)


        let contactButton = document.createElement('button')
        contactButton.className = 'open-button'
        contactButton.id = `${i}`
        containerContacts.appendChild(contactButton)
        document.getElementsByClassName('open-button')[i].onclick = openForm

/*creating blocks of basic information */
        /*Name */
        let contactsInfoName = document.createElement('div')
        contactsInfoName.className = 'container__contacts__item-name'
        contactsInfoName.innerHTML = contactBook[i].name
        contactsInfo.appendChild(contactsInfoName)
        
        /*email */
        let contactsInfoEmail = document.createElement('div')
        contactsInfoEmail.className = 'container__contacts__item-email'
        contactsInfoEmail.innerHTML = contactBook[i].email
        contactsInfo.appendChild(contactsInfoEmail)

        /*phone */
        let contactsInfoPhone = document.createElement('div')
        contactsInfoPhone.className = 'container__contacts__item-phone'
        contactsInfoPhone.innerHTML = contactBook[i].phone
        contactsInfo.appendChild(contactsInfoPhone)

        /*address */
        let contactsInfoAddress = document.createElement('div')
        contactsInfoAddress.className = 'container__contacts__item-address'
        contactsInfoAddress.innerHTML = contactBook[i].address.city
        contactsInfo.appendChild(contactsInfoAddress)

        /*Name Company */
        let contactsInfoCompany = document.createElement('div')
        contactsInfoCompany.className = 'container__contacts__item-company'
        contactsInfoCompany.innerHTML = contactBook[i].company.name
        contactsInfo.appendChild(contactsInfoCompany)

        /*webSite */
        let contactsInfoWebsite = document.createElement('div')
        contactsInfoWebsite.className = 'container__contacts__item-website'
        contactsInfo.appendChild(contactsInfoWebsite)
        contactsInfoWebsiteLink = document.createElement('a')
        contactsInfoWebsiteLink.href = `${contactBook[i].website}`
        contactsInfoWebsiteLink.innerHTML = contactBook[i].website
        contactsInfoWebsite.appendChild(contactsInfoWebsiteLink)

        
    }    
}

    
  /*function for opening a contact edit form */  
 function openForm() {

    document.getElementById("myForm").style.display = "block";
    /* create blackout */
    document.getElementById('wrapper__black').style.display ='block'
    
    /*Track button to edit contact*/
    /* button id corresponds to its id in local storage*/
    let idButton = this.id;
    
    /*filling input fields with data from local storage*/

    let inputName = document.getElementById('name')
    inputName.value = `${contactBook[idButton].name}`

    let inputEmail = document.getElementById('email')
    inputEmail.value = `${contactBook[idButton].email}`

    let inputPhone = document.getElementById('phone')
    inputPhone.value = `${contactBook[idButton].phone}`

    let inputAddress = document.getElementById('address')
    inputAddress.value = `${contactBook[idButton].address.city}`

    let inputCompany = document.getElementById('company')
    inputCompany.value = `${contactBook[idButton].company.name}`

    let inputWebsite = document.getElementById('site')
    inputWebsite.value = `${contactBook[idButton].website}`
    
    /*Assigning a handler for the save button*/
    document.getElementById("save").onclick = saveForm

    /*contact change function
    to do this, overwrite data in local storage */
    function saveForm() {

        /*values are read from input*/
        contactBook[idButton].name = inputName.value
        contactBook[idButton].email = inputEmail.value
        contactBook[idButton].phone = inputPhone.value
        contactBook[idButton].address.city = inputAddress.value
        contactBook[idButton].company.name = inputCompany.value
        contactBook[idButton].website = inputWebsite.value
        
        console.log(localStorage.setItem('contact', JSON.stringify(contactBook)));
        window.location.reload(alert("Контакт изменен"))
    }

            

        }
      /*function close form*/

        function closeForm() {
            document.getElementById("myForm").style.display = "none";
            document.getElementById('wrapper__black').style.display ='none'
        }
     
        
       
      
    
    
    
    



