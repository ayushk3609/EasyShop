const mongoose = require('mongoose')
const Product = require('./models/product')

const products = [
    {
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-graphite-hero?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1604021660000',
        name:'Iphone 12',
        price:100000,
        retailName:'xyz',
        desc:'The iPhone 12 is a dual-SIM (GSM and GSM) mobile in which you can use both Nano-SIM and eSIM cards. The smartphone runs iOS 14 and has an inbuilt storage of 64GB so that you can store all your local files, songs, videos, pictures, docs and more without any space constraints. <br> In addition to this, the smartphone from Apple houses a non-removable battery that supports both wireless and proprietary fast charging.<br>&nbsp;&nbsp;Speaking about the camera specifications, the iPhone 12 on the rear features a 12 MP primary camera with f/1.6 aperture and a 12 MP camera with f/2.4 aperture. Also, the rear setup has autofocus feature. While on the front, the mobile comes with a 12 MP camera with f/2.2 aperture for clicking some awesome selfies.<br>On iPhone 12, you get various connectivity options such as Wi-Fi 802.11 a/b/g/n/ac/Yes, Lightning, Bluetooth v5.00, NFC, GPS, 3G, and 4G (with support for Band 40 used by some LTE networks in India). Sensors on the smartphone include proximity sensor, ambient light sensor, barometer, accelerometer, gyroscope, and compass/ magnetometer. Also, there is face unlock with 3D face recognition for security purpose.'
    },
    {
        image:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX8E2_VW_34FR+watch-44-alum-spacegray-nc-nike6s_VW_34FR_WF_CO_GEO_IN?wid=750&hei=712&trim=1,0&fmt=p-jpg&qlt=80&.v=1599017871000,1601923999000',
        name:'Apple watch',
        price:60000,
        retailName:'all_in_one',
        desc:"Apple Watch comes with an included band (strap) to attach it to the user's wrist, which can be easily changed to other types. Third party bands are compatible with Apple Watch, however Apple produces bands in a variety of materials and colours which are updated each season. The most recent update to the colours occurred in March 2020.<br>&nbsp;&nbsp; Bands designed for the 38mm and 42mm cases are completely compatible with the 40mm and 44mm cases respectively.Starting with Apple Watch Series 5, Apple introduced the Apple Watch Studio which allows customers to mix and match bands, eliminating the need to purchase a specific combination and allows for a simplification of packaging (since Series 4)."

    },
    {
        image:'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=892&hei=820&&qlt=80&.v=1603332211000',
        name:'Macbook Air',
        price:200000,
        retailName:'ayush',
        desc:"The MacBook Air, based on Intel processors, was introduced in January 2008 with a 13.3-inch screen, and was promoted as the world's thinnest notebook, opening a laptop category known as the ultrabook family. Apple released a second generation MacBook Air in October 2010, with a redesigned tapered chassis, standard solid-state storage, and added a smaller 11.6-inch version. \nLater revisions added Intel Core i5 or i7 processors and Thunderbolt.<br>&nbsp;&nbsp; The third generation was released in October 2018, with reduced dimensions, a Retina display, and combination USB-C/Thunderbolt 3 ports for data and power. An updated model was released in February 2020 with the Magic Keyboard and an option for an Intel Core i7 processor."
    },
    {
        image:'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MWP22_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1591634652000',
        name:'Apple buds pro',
        price:16000,
        retailName:'xyz',
        desc:"AirPods Pro were released on October 30, 2019 as a premium option compared to AirPods. They use the same H1 chip found in second generation AirPods, and boast a slimmer design, active noise cancellation, adaptive EQ, IPX4 water resistance, a new charging case with Qi standard, and include silicone tips"
    },
    {
        image:'https://images-na.ssl-images-amazon.com/images/I/81g7AiqWrtL._AC_SL1500_.jpg',
        name:'Acer Predator',
        price:126000,
        retailName:'all_in_one',
        desc:"Acer Predator is a gamer-focused brand and line of computer hardware owned by Acer. In 2008, Acer introduced itself in the gaming computer market with a line of desktop computers: the Acer Aspire Predator series, later renamed as Acer Predator. The series is characterized by the futuristic computer chassis and high performance.<br> In 2016, a complete range of Predator desktops, gaming notebooks, tablets and accessories exists"
    },
    {
        image:'https://i.gadgets360cdn.com/products/large/realme-watch-670x800-1590388807.jpg',
        name:'Realme SmartWatch',
        price:3600,
        retailName:'ayush',
        desc:"Featuring a large 3.5 cm (1.4) touchscreen, this smartwatch from realme is a must-have accessory. It will help you keep track of your fitness endeavours with its set of features such as heart rate monitor, 14 sports modes, and blood oxygen level monitor. Oh, you needn’t take your phone out for everything, as this smartwatch supports notifications for texts, calls, and more."
    },
    {
        image:'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/374765/02/sv01/fnd/IND/fmt/png/Rebound-JOY-SoftFoam+-Shoes',
        name:'PUMA Shoe',
        price:8000,
        retailName:'xyz',
        desc:"Here’s a basketball-inspired shoe that’s going to change the game. A dash of retro inspiration combines with PUMA’s DNA to create a shoe that looks good both on the court and off. Featuring an upper made with synthetic leather and TPU, it’s got the flexibility you want and, thanks to the SoftFoam+ sockliner, it’s going to give you the support you need.<br> A final touch is the perforations, which give this shoe a trendy, more aerodynamic look."
    },
    {
        image:'https://5.imimg.com/data5/VS/LV/MY-47202023/tourist-royal-blue-bag-500x500.jpg',
        name:'Tourist Bag',
        price:1600,
        retailName:'all_in_one',
        desc:"Renowned amid one of the credible and eminent business names, we are actively committed in presenting a world class Tourist Royal Blue Bag."
    },
    {
        image:'https://assets.myntassets.com/fl_progressive/h_960,q_80,w_720/v1/assets/images/2365523/2018/2/9/11518161462196-US-Polo-Assn-Men-White-Solid-Polo-Collar-T-shirt-5091518161462058-1.jpg',
        name:'U.S. POLO t-shirt',
        price:1600,
        retailName:'ayush',
        desc:"White solid polo T-shirt, has a polo collar, short sleevesThe basic tee, after all, is the simplest, easiest piece of clothing imaginable—its blank-page quality functions like a screen on which we project our current cultural preoccupations. A T-shirt can denote working-class status (if, for example, you’re the Boss)"
    },
    {
        image:'https://cdn.shopify.com/s/files/1/1676/7297/products/Main-Image_5dd17660-d566-4297-bc2e-e43de833b2fc.jpg?v=1613028178',
        name:'Leaf Headphone',
        price:16000,
        retailName:'xyz',
        desc:"Leaf Bass’s ergonomic designs helps you cut out the noise around you when you’re using them. They come with noise isolation which allows the headphones to cancel out the ambient noise around you to almost 95% which will help you zone into your favorite songs. <br>Leaf Bass has ultra-soft cushion ear cups and headband cushion for superior comfort also ensuring your ears don’t experience pain when you put them on for long hours. It’s designed perfectly for long listening hours to give you all the comfort required while jamming."
    },
    {
        image:'https://images.samsung.com/is/image/samsung/p6pim/my/sm-g996bzvdxme/gallery/my-galaxy-s21-5g-g996-371045-sm-g996bzvdxme-392276588?$720_576_PNG$',
        name:'Samsung Galaxy',
        price:26000,
        retailName:'ayush',
        desc:"The Samsung Galaxy F52 5G is powered by 1.8GHz octa-core Qualcomm Snapdragon 750G processor and it comes with 8GB of RAM.<br>&nbsp;&nbsp; The phone packs 128GB of internal storage that can be expanded up to 1000GB via a microSD card. As far as the cameras are concerned, the Samsung Galaxy F52 5G packs a 64-megapixel (f/1.8) + 8-megapixel (f/2.2) + 2-megapixel (f/2.4) + 2-megapixel (f/2.4) primary camera on the rear and a 16-megapixel front shooter for selfies.<br>&nbsp;&nbsp; The Samsung Galaxy F52 5G runs Android 11 and is powered by a 4500mAh. It measures 164.60 x 76.30 x 8.70 (height x width x thickness) and weigh 199.00 grams."
    },
    {
        image:'https://martinvalen.com/5975-large_default/men-s-light-blue-jeans-with-rips.jpg',
        name:'Rugged Jean',
        price:1200,
        retailName:'xyz',
        desc:"THE MEN'S LIGHT-BLUE JEANS WITH RIPS IS PART OF THE MARTIN VALEN JEANS COLLECTION.Fashion arises from difference.<br>&nbsp;&nbsp; Our jeans series, which were created with the perfect harmony of embroidered patchwork and ripped parts, will take you one step forward in urban style.You can create a great outfit by combining them with our Oversize or Regular fit tops and High Sole Sneakers.<br>&nbsp;&nbsp; Martin Valen offers you the perfect cuts and the highest quality materials."
    },
    {
        image:'https://5.imimg.com/data5/IP/TN/MY-75932613/transparent-lens-in-a-black-frame-500x500.jpg',
        name:'Classic Aviator',
        price:1600,
        retailName:'ayush',
        desc:"With our several years of successfully providing our clients superior quality products, we have gained proficiency in offering Transparent Lens In A Black"
    },
    {
        image:'https://5.imimg.com/data5/YG/FV/MY-6187984/men-s-office-shoes-500x500.jpg',
        name:'Mens Office Shoes',
        price:1800,
        retailName:'all_in_one',
        desc:"Best Deal Store Gives You The Best Products With better LifeStyle And Compfort We Are Specialist in making Casual Shoes ,Boots,men Shoes, Sneakers, Formal Shoes, Leather Shoes and Shoes Accessories For our Esteemed Clients. Stylish Shoes For men with better quality and Better grip. Our sneakers are very much liked by Mens and boys. The TPR sole offers great comfort for all day long. We Sell Shoes Online at Best Deal Store Buy Online Shoes ,Leather Shoes Hip Hop Shoes Sneaker Shoes We cant Sell cheap Shoes . Quality and customer satisfaction Is Our Main Motto. Furthermore, it is recommended to be kept away from extreme heat and corrosive liquids to avoid damage."
    },
    {
        image:'https://images.philips.com/is/image/PhilipsConsumer/BT3102_15-IMS-en_IN?$jpglarge$&wid=960',
        name:'Phillips trimmer',
        price:2200,
        retailName:'xyz',
        desc:'This trimmer with the innovative Lift & Trim system lifts and captures more low-lying hairs for efficient, even trimming results. This way you will easily achieve the 3-day stubble, short beard or long beard look you want.'
    },
    {
        image:'https://rukminim1.flixcart.com/image/714/857/jvzkb680/t-shirt/u/v/6/xl-tshirt-xl-01-whtgryblk-tshirts-men-print-station-original-imafgsy7hqky848d.jpeg?q=50',
        name:'B & W T-shirt',
        price:934,
        retailName:'ayush',
        desc:'Look your stylish best in this trendy color-block full sleeve round neck t-shirt from the latest collection of Urbano Fashion. The youthful design, high-quality 100% cotton fabric, custom fit make it a must have for this season. Pair this t-shirt with any light shade of Urbano Fashion jeans for a fabulous casual look. Colors - Black, Grey, Yellow Note: Imperial Clothing Company is the only manufacturer and authorized retailer of brand Urbano Fashion. Please check seller name before purchase.'
    }

    
]

const seedDB = async ()=>{
    await Product.insertMany(products)
    console.log('DB SEEDED')
}

module.exports = seedDB