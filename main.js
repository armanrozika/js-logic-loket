


//get country code lists
(function createOption(){
	const fetchCode = async function(){
		const select = document.querySelector('.select')

		//fetch all country phone code from github
		const res = await fetch('https://gist.githubusercontent.com/Goles/3196253/raw/9ca4e7e62ea5ad935bb3580dc0a07d9df033b451/CountryCodes.json');
		const countryCode = await res.json();

		//make new option based on json data
		let newOption = countryCode.map(data => {
			let option = document.createElement('option')
			option.innerText = data.dial_code;
			option.value = data.dial_code;
			select.appendChild(option)
		}) 
	}

	fetchCode()

})();


//form validity
(function formValid(){
	let form = document.querySelector('form')
	let button = document.querySelector('button')
	let name = document.querySelector('#name')
	let email = document.querySelector('#email')
	let phone = document.querySelector('#phone')
	let address = document.querySelector('#address')
	let success = document.querySelector('.success')
	let error = document.querySelectorAll('form p')
	let main = document.querySelector('.main')

	let regPattern = {
		email: /^[a-z]+((_|\.|-)?[a-z\d]+)*@[a-z\d]+((-)?[a-z\d]+)*\.[a-z]{2,8}(\.[a-z]{2,8})?$/,
		phone: /^[0-9]{1,}$/
	}

	button.addEventListener('click', (e)=>{
		if(name.value.length < 5){
			e.preventDefault()
			error[0].style.visibility = 'visible'
		}else{
			error[0].style.visibility = 'hidden'
		}
		if(regPattern.email.test(email.value) == false){
			e.preventDefault()
			error[1].style.visibility = 'visible'
		}else{
			error[1].style.visibility = 'hidden'
		}
		if(regPattern.phone.test(phone.value) == false){
			e.preventDefault()
			error[2].style.visibility = 'visible'
		}else{
			error[2].style.visibility = 'hidden'
		}
		if(address.value > 130){
			e.preventDefault()
			error[3].style.visibility = 'visible'
		}else{
			error[3].style.visibility = 'hidden'
		}

		let errOne = error[0].style.visibility,
			 errTwo = error[1].style.visibility,
			 errThree = error[2].style.visibility,
			 errFour = error[3].style.visibility;

		//show thank you page and invoice
		let thank = document.querySelector('.thank')
		let emailsuccess = document.querySelector('#emailsuccess')
		let invoice = document.querySelector('#invoice')

		//alphanumeric randomize
		function randomString(length, chars) {
          var result = '';
          for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
          return result;
      }
      let rstring = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ')
		emailsuccess.innerText = `Your ticket has been sent to ${email.value}`
		invoice.innerText = rstring

		if(errOne != 'visible' && errTwo != 'visible' && errThree != 'visible' && errFour != 'visible'){
			success.style.display = 'block'
			main.style.display = 'none'
			thank.style.display = 'block'
		}
		e.preventDefault();

	});

	name.addEventListener('keyup', ()=>{
		if(name.value.length >=5){
			error[0].style.visibility = 'hidden'
		}
	})
	email.addEventListener('keyup', ()=>{
		if(regPattern.email.test(email.value) == true){
			error[1].style.visibility = 'hidden'
		}
	})
	phone.addEventListener('keyup', ()=>{
		if(regPattern.phone.test(phone.value) == true){
			error[2].style.visibility = 'hidden'
		}
	})
	address.addEventListener('keyup', ()=>{
		if(address.value.length < 130){
			error[3].style.visibility = 'hidden'
		}
	})

})();


