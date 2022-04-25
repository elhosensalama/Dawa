/* eslint-disable */

// TODO starting info
const port = 8000;
const host = '127.0.0.1';

// TODO showing alerts.
// type is 'success' or 'error'
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="c-alert c-alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    setTimeout(hideAlert, 5000);
};
const hideAlert = () => {
    const el = document.querySelector('.c-alert');
    if (el) el.classList.add('hide');
    setTimeout(() => {
        if (el) el.parentElement.removeChild(el);
    }, 1000);
};

// TODO logging in.

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://${host}:${port}/api/v1/users/login`,
            data: {
                email,
                password,
            },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Logged in successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};
const form = document.querySelector('.form__login');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        login(email, password);
    });
}

// TODO logging out.
const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: `http://${host}:${port}/api/v1/users/logout`,
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Logged out successfully');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (error) {
        showAlert(
            'error',
            'Error logging out! please try again or contact us!'
        );
    }
};

const logoutBtn = document.querySelector('.nav__el--logout');

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });
}

// TODO sign up.

const signup = async (data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://${host}:${port}/api/v1/users/signup`,
            data,
        });
        if (res.data.status === 'success') {
            showAlert('success', 'signed up successfully');
            window.setTimeout(() => {
                location.assign('/me');
            }, 4000);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

const signupForm = document.querySelector('.form__signup');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const passwordConfirm =
            document.querySelector('#passwordConfirm').value;
        signup({ name, email, password, passwordConfirm });
    });
}

// TODO update settings

// type is 'password' or 'data'
const updateSettings = async (data, type) => {
    try {
        const url = type === 'password' ? 'updateMyPassword' : 'updateMe';
        const res = await axios({
            method: 'PATCH',
            url: `http://${host}:${port}/api/v1/users/${url}`,
            data,
        });
        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} updated successfuly`);
        }
    } catch (error) {
        showAlert('error', error.response.data.message);
    }
};

const userDataForm = document.querySelector('.form-user-data');

if (userDataForm) {
    userDataForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append(
            'phone_number',
            document.getElementById('phone_number').value
        );
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        updateSettings(form, 'data');
    });
}

const userSettingsForm = document.querySelector('.form-user-settings');

if (userSettingsForm) {
    userSettingsForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent =
            'Updating...';
        const pass = document.getElementById('password');
        const passCurr = document.getElementById('password-current');
        const passConf = document.getElementById('password-confirm');

        const password = pass.value;
        const passwordCurrent = passCurr.value;
        const passwordConfirm = passConf.value;
        await updateSettings(
            { passwordCurrent, password, passwordConfirm },
            'password'
        );

        pass.value = '';
        passCurr.value = '';
        passConf.value = '';
        document.querySelector('.btn--save-password').textContent =
            'save password ';
    });
}

const table = document.querySelector('.table-container');

if (table) {
    table.addEventListener('click', (e) => {
        const dataKind = e.target.getAttribute('data-kind');
        const dataClass = e.target.getAttribute('class');
        const dataId = e.target.getAttribute('data-id');
        const dataItem = e.target.getAttribute('data-item');
        if (dataKind == 'btn') {
            if (dataClass == 'delete_item_btn') {
                deleteItem(dataId, dataItem);
            }
            if (dataClass == 'edit_item_btn') {
                if (dataItem == 'product')
                    location.assign(`/edit_product/${dataId}`);
            }
            if (dataClass == 'show_item_btn') {
                if (dataItem == 'product')
                    location.assign(`/show_product/${dataId}`);
                if (dataItem == 'order')
                    location.assign(`/show_order/${dataId}`);
                if (dataItem == 'review')
                    location.assign(`/show_review/${dataId}`);
            }
        }
    });
}
const deleteItem = async (id, kind) => {
    try {
        const ans = confirm(
            `Are you sure that you what to delete this ${kind} ?`
        );
        if (ans) {
            const res = await axios({
                method: 'DELETE',
                url: `http://${host}:${port}/api/v1/${kind}s/${id}`,
            });
            if (res.status === 204) {
                showAlert('success', `${kind} deleted successfully`);
                window.setTimeout(() => {
                    location.assign(`/manage_${kind}s`);
                }, 1000);
            }
        }
    } catch (error) {
        showAlert('error', error);
    }
};

const formCreateProduct = document.querySelector('.form-create-product');

if (formCreateProduct) {
    formCreateProduct.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('product_name').value);
        form.append('category', document.getElementById('category').value);
        form.append('quality', document.getElementById('quality').value);
        form.append('price', document.getElementById('price').value);
        form.append('slug', document.getElementById('slug').value);
        form.append(
            'price_discount',
            document.getElementById('price_discount').value
        );
        form.append('weight', document.getElementById('weight').value);
        form.append('summary', document.getElementById('summary').value);
        if (document.getElementById('image').files[0])
            form.append('image', document.getElementById('image').files[0]);
        else form.append('image', 'default.jpg');
        createProduct(form);
    });
}

const createProduct = async (data) => {
    try {
        document.querySelector('.create_product_btn').textContent =
            'Creating...';
        const res = await axios({
            method: 'POST',
            url: `http://${host}:${port}/api/v1/products`,
            data,
        });
        if (res.data.status === 'success') {
            showAlert('success', `Product created successfuly`);
        }
        window.setTimeout(() => {
            location.assign(`/manage_products`);
        }, 1000);
    } catch (error) {
        document.querySelector('.create_product_btn').textContent =
            'Create Product';
        showAlert('error', error.response.data.message);
    }
};

const formEditProduct = document.querySelector('.form-edit-product');

if (formEditProduct) {
    formEditProduct.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = new FormData();
        form.append('name', document.getElementById('product_name').value);
        form.append('category', document.getElementById('category').value);
        form.append('quality', document.getElementById('quality').value);
        form.append('price', document.getElementById('price').value);
        form.append('slug', document.getElementById('slug').value);
        form.append(
            'price_discount',
            document.getElementById('price_discount').value
        );
        form.append('weight', document.getElementById('weight').value);
        form.append('summary', document.getElementById('summary').value);
        if (document.getElementById('image').files[0])
            form.append('image', document.getElementById('image').files[0]);
        editProduct(form);
    });
}

const editProduct = async (data) => {
    try {
        const id = document
            .querySelector('.edit_product_btn')
            .getAttribute('data-id');
        document.querySelector('.edit_product_btn').textContent = 'Updating...';
        const res = await axios({
            method: 'PATCH',
            url: `http://${host}:${port}/api/v1/products/${id}`,
            data,
        });
        if (res.data.status === 'success') {
            showAlert('success', `Product Updated successfuly`);
        }
        window.setTimeout(() => {
            location.assign(`/manage_products`);
        }, 1000);
    } catch (error) {
        document.querySelector('.edit_product_btn').textContent =
            'Update Product';
        showAlert('error', error.response.data.message);
    }
};