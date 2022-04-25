const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLogedIn, viewsController.getHomePage);

router.get('/dashboard', authController.protect, viewsController.getStatsAll);
router.get('/main', authController.protect, viewsController.getMain);
router.get('/akeda', authController.protect, viewsController.getPageAkeda);
router.get('/fekh', authController.protect, viewsController.getPageFekh);
router.get('/sera', authController.protect, viewsController.getPageSera);
router.get('/hadith', authController.protect, viewsController.getPageHadith);
router.get('/tafser', authController.protect, viewsController.getPageTafser);

router.get(
    '/manage_products',
    authController.protect,
    viewsController.manageProducts
);
router.get(
    '/manage_orders',
    authController.protect,
    viewsController.manageOrders
);
router.get(
    '/manage_reviews',
    authController.protect,
    viewsController.manageReviews
);
router.get(
    '/manage_account',
    authController.protect,
    viewsController.manageAccount
);
router.get(
    '/create_product',
    authController.protect,
    viewsController.getCreateProduct
);
router.get(
    '/edit_product/:productId',
    authController.protect,
    viewsController.getUpdateProduct
);
router.get(
    '/show_product/:productId',
    authController.protect,
    viewsController.getShowProduct
);
router.get(
    '/show_order/:orderId',
    authController.protect,
    viewsController.getShowOrder
);
router.get(
    '/show_review/:reviewId',
    authController.protect,
    viewsController.getShowReview
);

// /login
router.get('/login', authController.isLogedIn, viewsController.getLoginForm);
router.get('/signup', authController.isLogedIn, viewsController.getSignupForm);

module.exports = router;
