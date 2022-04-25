// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHomePage = catchAsync(async (req, res, next) => {
    res.status(200).render('overview', {
        title: 'Home',
    });
});
exports.getMain = catchAsync(async (req, res, next) => {
    res.status(200).render('main', {
        title: 'main',
        nav_item_home: true,
    });
});
exports.getPageAkeda = catchAsync(async (req, res, next) => {
    res.status(200).render('page_akeda', {
        title: 'Akeda',
        nav_item_home: true,
    });
});
exports.getPageFekh = catchAsync(async (req, res, next) => {
    res.status(200).render('page_fekh', {
        title: 'Fekh',
        nav_item_home: true,
    });
});
exports.getPageSera = catchAsync(async (req, res, next) => {
    res.status(200).render('page_sera', {
        title: 'Sera',
        nav_item_home: true,
    });
});
exports.getPageHadith = catchAsync(async (req, res, next) => {
    res.status(200).render('page_hadith', {
        title: 'Hadith',
        nav_item_home: true,
    });
});
exports.getPageTafser = catchAsync(async (req, res, next) => {
    res.status(200).render('page_tafser', {
        title: 'Tafser',
        nav_item_home: true,
    });
});

exports.getLoginForm = catchAsync(async (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your account',
    });
});
exports.getSignupForm = catchAsync(async (req, res) => {
    // 1) build templete
    // 2) Render that template
    res.status(200).render('signup', {
        title: 'Create your new account',
    });
});

// TODO Backend

exports.manageAccount = catchAsync(async (req, res) => {
    res.status(200).render('db_settings', {
        title: 'Your Account',
        page_settings_val: true,
    });
});
exports.manageProducts = catchAsync(async (req, res) => {
    // 1) Get product data from collection
    let products;
    const q = req.query.name;
    // const r = new RegExp(`.*${q}.*`, 'i');
    if (q) {
        // products = await Product.find({ name: r });
    } else {
        // products = await Product.find();
    }
    res.status(200).render('db_products', {
        title: 'manage products',
        page_products_val: true,
        products,
    });
});
exports.manageOrders = catchAsync(async (req, res) => {
    // 1) Get Order data from collection
    // const orders = await Order.find();
    res.status(200).render('db_orders', {
        title: 'manage orders',
        page_orders_val: true,
        // orders,
    });
});
exports.manageReviews = catchAsync(async (req, res) => {
    // 1) Get Review data from collection
    // const reviews = await Review.find().populate({
    //     path: 'product',
    //     fields: 'name category',
    // });
    res.status(200).render('db_reviews', {
        title: 'manage reviews',
        page_reviews_val: true,
    });
});
exports.getCreateProduct = catchAsync(async (req, res) => {
    res.status(200).render('db_create_product', {
        title: 'create product',
        page_create_product_val: true,
    });
});
exports.getUpdateProduct = catchAsync(async (req, res) => {
    res.status(200).render('db_edit_product', {
        title: 'Edit product',
    });
});

exports.getShowProduct = catchAsync(async (req, res) => {
    res.status(200).render('db_show_product', {
        title: 'Show product',
    });
});
exports.getShowOrder = catchAsync(async (req, res) => {
    res.status(200).render('db_show_order', {
        title: 'Show Order',
    });
});
exports.getShowReview = catchAsync(async (req, res) => {
    res.status(200).render('db_show_review', {
        title: 'Show Review',
    });
});

exports.getStatsAll = catchAsync(async (req, res) => {
    res.status(200).render('db_stats', {
        title: 'Dashboard',
        page_dashboard_val: true,
    });
});
