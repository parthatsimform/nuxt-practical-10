export default async (ref, errDiv, err) => {
	ref.focus();
	ref.style.border = "1px solid red";
	document.getElementsByClassName(errDiv)[0].innerHTML = err;
};
