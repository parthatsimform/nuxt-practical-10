import { useUserStore } from "../stores/user";
import { useCarStore } from "../stores/car";
import { mapState } from "pinia";
export default {
	computed: {
		...mapState(useCarStore, ["car"]),
		...mapState(useUserStore, ["user"]),
	},
	methods: {
		validate(val, field, error) {
			if (val == "") {
				useShowError(
					this.$refs[`${field}Input`],
					`${field}Error`,
					error
				);
				return false;
			} else {
				useRemoveError(this.$refs[`${field}Input`], `${field}Error`);
				return true;
			}
		},
		validateName(name) {
			if (name === "") {
				useShowError(
					this.$refs.nameInput,
					"nameError",
					"User name is required"
				);
				return false;
			} else {
				useRemoveError(this.$refs.nameInput, "nameError");
				return true;
			}
		},
		validateEmail(email) {
			const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
			if (emailRegex.test(email)) {
				useRemoveError(this.$refs.emailInput, "emailError");
				return true;
			} else {
				useShowError(
					this.$refs.emailInput,
					"emailError",
					"Valid Email ID is required"
				);
				return false;
			}
		},
		validatePassword(password) {
			const passwordRegex =
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/;
			if (passwordRegex.test(password)) {
				useRemoveError(this.$refs.passwordInput, "passwordError");
				return true;
			} else {
				useShowError(
					this.$refs.passwordInput,
					"passwordError",
					"Password of length 8-12 is required and must contain at least one numeric digit and a special character"
				);
				return false;
			}
		},
		validateCPassword(cPassword, password) {
			if (cPassword == "" || cPassword !== password) {
				useShowError(
					this.$refs.cPasswordInput,
					"cPasswordError",
					"Confirm password doesn't match with password"
				);
				return false;
			} else {
				useRemoveError(this.$refs.cPasswordInput, "cPasswordError");
				return true;
			}
		},
		validateRole(role) {
			if (role === "") {
				useShowError(
					this.$refs.roleInput,
					"roleError",
					"Please select a role"
				);
				return false;
			} else {
				useRemoveError(this.$refs.roleInput, "roleError");
				return true;
			}
		},
		validateGender(gender) {
			if (gender === "") {
				useShowError(
					this.$refs.genderInput,
					"genderError",
					"Please select a gender"
				);
				return false;
			} else {
				useRemoveError(this.$refs.genderInput, "genderError");
				return true;
			}
		},
		validateAge(age) {
			if (age !== "" && Number.isInteger(Number(age))) {
				useRemoveError(this.$refs.ageInput, "ageError");
				return true;
			} else {
				useShowError(
					this.$refs.ageInput,
					"ageError",
					"Age must be in integer required"
				);
				return false;
			}
		},
		validDOB(dob) {
			const givenDate = new Date(dob);
			const currDate = new Date();
			if (givenDate.getFullYear() >= 1900 && givenDate < currDate) {
				return true;
			}
			return false;
		},
		validateDOB(dob) {
			if (dob === "") {
				useShowError(
					this.$refs.dobInput,
					"dobError",
					"Please select your DOB"
				);
				return false;
			} else if (!this.validDOB(dob)) {
				useShowError(
					this.$refs.dobInput,
					"dobError",
					"Please select valid DOB having year >=1900"
				);
			} else {
				useRemoveError(this.$refs.dobInput, "dobError");
				return true;
			}
		},
		validateCarName() {
			if (this.car.name == "") {
				useShowError(
					this.$refs.carNameInput,
					"carNameError",
					"Car name is required"
				);
				return false;
			} else {
				useRemoveError(this.$refs.carNameInput, "carNameError");
				return true;
			}
		},
		urlChacker() {
			const urlPattern =
				/^((https?:)?\/\/)?[^\s]+\.(jpe?g|png|gif|bmp|webp)(\?\S*)?$/i;
			return urlPattern.test(this.car.image);
		},
		validateImage() {
			if (!this.urlChacker()) {
				useShowError(
					this.$refs.imageInput,
					"imageError",
					"Please enter a valid image URL"
				);
				return false;
			} else {
				useRemoveError(this.$refs.imageInput, "imageError");
				return true;
			}
		},
		validatedetails() {
			if (
				this.car.details === "" ||
				this.car.details.length < 30 ||
				this.car.details.length > 120
			) {
				useShowError(
					this.$refs.detailsInput,
					"detailsError",
					"Car detail in limit of 30 to 120 characters is required"
				);
				return false;
			} else {
				useRemoveError(this.$refs.detailsInput, "detailsError");
				return true;
			}
		},

		validatePrice() {
			if (
				this.car.price !== "" &&
				Number.isInteger(Number(this.car.price))
			) {
				useRemoveError(this.$refs.priceInput, "priceError");
				return true;
			} else {
				useShowError(
					this.$refs.priceInput,
					"priceError",
					"Car Price in integer is required"
				);
				return false;
			}
		},
	},
};
