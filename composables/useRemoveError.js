export default async (ref, errDiv) => {
	ref.style.border = "1px solid rgb(192, 192, 192)";
	document.getElementsByClassName(errDiv)[0].innerHTML = "";
};
