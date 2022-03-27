const form = document.forms.form;
const button = document.getElementById("button");
const arr = []

function getUserData() {
	if (!form.name.value || !form.salary.value || !form.age.value) {
		console.log("поле не заполнено или заполнено не правильно");
	}
	else {

		let name = document.createElement('div');
		name.append(form.name.value)
		let age = document.createElement('div');
		age.append(form.age.value)
		let salary = document.createElement('div');
		salary.append(form.salary.value)

		const userData = document.createElement("div")
		userData.append(name)
		userData.append(age)
		userData.append(salary)
		return userData
	}
}

const showtUserData = () => {
	const userDataWrap = document.getElementById("user-data")
	const userData = getUserData()
	userDataWrap.append(userData)
}

button.onclick = showtUserData
