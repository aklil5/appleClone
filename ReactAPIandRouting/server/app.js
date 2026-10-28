const mysql = require("mysql2");
const express = require("express");
var cors = require("cors");

const body_parser = require("body-parser");

var app = express();

// we can only allow a few of our partner for cors
// const corsOption = {
//     origin: [
//         "https://localhost:3001",
//         "https://www.apple.com"
//     ],
// }

// app.use(cors(corsOption))

// OR use this

app.use(cors());



// Use  body parser as middle ware
app.use(body_parser.urlencoded({ extended: true }));

var mysqlConnection = mysql.createConnection({
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
  user: "apple",
  password: "apple",
  host: "localhost",
  database: "apple",
});

mysqlConnection.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected");
});

// Install: Create the tables necessary
app.get("/install", (req, res) => {
  let message = "Tables Created";
  // products table
  let createProducts = `CREATE TABLE if not exists Products(
        Product_id int auto_increment,
        Product_url varchar(255) not null,
        Product_name varchar(255) not null,
        
        PRIMARY KEY (Product_id)
    )`;

  // product description table
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
      description_id int auto_increment,
      Product_id int(11) not null,
      Product_brief_description varchar(255) not null,
      Product_description varchar(255) not null,
      Product_img varchar(255) not null,
      Product_link varchar(255) not null,

      PRIMARY KEY (description_id),
      FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
    )`;
  // product price table
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
      price_id int auto_increment,
      Product_id int(11) not null,    
      Starting_price varchar(255) not null,
      price_range varchar(255) not null,

      PRIMARY KEY (price_id),
      FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
    )`;

  mysqlConnection.query(createProducts, (err) => {
    if (err) console.log(err);
  });
  mysqlConnection.query(createProductDescription, (err) => {
    if (err) console.log(err);
  });
  mysqlConnection.query(createProductPrice, (err, results) => {
    if (err) console.log(err);
  });

  res.end(message);
});



// Insert a new iPhone
app.post("/add-product", (req, res) => {
  // products table
  let Product_name = req.body.Product_name;
  let Product_url = req.body.Product_url;
  // Product_description table
  let Product_brief_description = req.body.Product_brief_description;
  let Product_description = req.body.Product_description;
  let Product_img = req.body.Product_img;
  let Product_link = req.body.Product_link;
  // ProductPrice table
  let Starting_price = req.body.Starting_price;
  let price_range = req.body.price_range;

  let insertProduct = `INSERT INTO products (Product_url,Product_name) VALUES ("${Product_url}", "${Product_name}") ;`;

  mysqlConnection.query(insertProduct, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
  });
  const selectPID = `SELECT Product_id FROM products WHERE Product_name = "${Product_name}"`;

  mysqlConnection.query(selectPID, (err, result) => {
    const PId = result[0].Product_id;
    if (err) {
      console.log(err);
      res.end(err);
    } else {

      let insert_Product_des = `INSERT INTO ProductDescription(Product_id,Product_brief_description,Product_description,Product_img,Product_link) VALUES (${PId},"${Product_brief_description}","${Product_description}","${Product_img}","${Product_link}")`;

      let insert_Product_price = `INSERT INTO ProductPrice(Product_id,Product__price,price_range) VALUES ("${PId}","${Product__price}", "${price_range}") ;`;


      mysqlConnection.query(insert_Product_des, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        }
      });

      mysqlConnection.query(insert_Product_price, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        }
      });

    }
    res.send("data inserted");
  });

});


//Get all iphone's
app.get("/iphones", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM Products INNER JOIN ProductDescription INNER JOIN ProductPrice ON Products.Product_id = ProductDescription.Product_id AND Products.Product_id = ProductPrice.Product_id",
    (err, rows) => {
      if (!err) res.json({ products: rows });
      else console.log(err);

    }
)})

app.listen(3001, (err) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log("Listening to : 3001")
  }
});


app.get("/install", (req, res) => {
  const statements = [
    `CREATE TABLE IF NOT EXISTS Products(
        Product_id INT AUTO_INCREMENT,
        Product_url VARCHAR(255) NOT NULL,
        Product_name VARCHAR(255) NOT NULL,
        PRIMARY KEY (Product_id))`,

    `CREATE TABLE IF NOT EXISTS User(
        user_id INT AUTO_INCREMENT,
        User_name VARCHAR(30) NOT NULL,
        User_password VARCHAR(100) NOT NULL,
        PRIMARY KEY (user_id))`,

    `CREATE TABLE IF NOT EXISTS ProductDescription(
        Description_id INT AUTO_INCREMENT,
        Product_id INT NOT NULL,
        Product_brief_description VARCHAR(255) NOT NULL,
        Product_description TEXT NOT NULL,
        Product_img VARCHAR(255) NOT NULL,
        Product_link VARCHAR(255) NOT NULL,
        PRIMARY KEY (Description_id),
        FOREIGN KEY (Product_id) REFERENCES Products(Product_id))`,

    `CREATE TABLE IF NOT EXISTS ProductPrice(
        Price_id INT AUTO_INCREMENT,
        Product_id INT NOT NULL,
        Product__price VARCHAR(30) NOT NULL,
        Price_range VARCHAR(255) NOT NULL,
        PRIMARY KEY (Price_id),
        FOREIGN KEY (Product_id) REFERENCES Products(Product_id))`,

    `CREATE TABLE IF NOT EXISTS Orders(
        order_id INT AUTO_INCREMENT,
        Product_id INT NOT NULL,
        user_id INT NOT NULL,
        PRIMARY KEY (order_id),
        FOREIGN KEY (Product_id) REFERENCES Products(Product_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id))`
  ];

  const runNext = (i) => {
    if (i === statements.length) return res.send("Tables Created");
    connection.query(statements[i], (err) => {
      if (err) {
        console.log("Error found:", err);
        return res.status(500).send("Error creating tables");
      }
      runNext(i + 1);
    });
  };
  runNext(0);
});






// app.post("/add-product", (req, res) => {
//   const fail = (err) => {
//     console.log("ERROR", err);
//     if (!res.headersSent) res.status(500).send(err.message);
//   };

//   const products = [
//     ["https://www.apple.com/in/iphone-se/", "iPhone SE"],
//     ["https://www.apple.com/in/iphone-11/", "iPhone 11"],
//     ["https://support.apple.com/en-in/111879", "iPhone 11 Pro"],
//   ];

//   connection.query("INSERT INTO Products (Product_url, Product_name) VALUES ?", [products], (err, result) => {
//     if (err) return fail(err);

//     const [seId, elevenId, proId] = [result.insertId, result.insertId + 1, result.insertId + 2];

//     const descriptions = [
//       [seId, "Lots to love. Less to spend.", "iPhone SE packs our most powerful chip...", "https://.../imagethree-...jpeg", "https://www.apple.com/in/iphone-se/"],
//       [elevenId, "Lots to love. Less to spend.", "You can either pay for your new iPhone in full...", "https://.../imagetwo-...jpeg", "https://www.apple.com/in/iphone-11/"],
//       [proId, "Pro cameras. Pro display. Pro performance.", "A transformative triple-camera system...", "https://.../imageone-...jpeg", "https://support.apple.com/en-in/111879"],
//     ];
//     const prices = [
//       [seId, "$399", "From $9.54/mo. or $229 with trade-in."],
//       [elevenId, "$449", "From $18.70/mo. or $449 with trade-in."],
//       [proId, "$679", "From $28.29/mo. or $679 with trade-in."],
//     ];

//     connection.query(
//       "INSERT INTO ProductDescription (Product_id, Product_brief_description, Product_description, Product_img, Product_link) VALUES ?",
//       [descriptions], (err) => {
//         if (err) return fail(err);

//         connection.query(
//           "INSERT INTO ProductPrice (Product_id, Product__price, Price_range) VALUES ?",
//           [prices], (err) => {
//             if (err) return fail(err);

//             // hash this with bcrypt in real code
//             connection.query(
//               "INSERT INTO User (User_name, User_password) VALUES (?, ?)",
//               ["abebe", "hashed_password_here"], (err, userResult) => {
//                 if (err) return fail(err);

//                 connection.query(
//                   "INSERT INTO Orders (Product_id, user_id) VALUES (?, ?)",
//                   [seId, userResult.insertId], (err) => {
//                     if (err) return fail(err);
//                     res.send("DATA INSERTED");   // only after everything succeeded
//                   });
//               });
//           });
//       });
//   });
// });



            
app.post('/add-product', (req, res) => {
    console.log(req.body);

    // Only the fields the client must send. Description_id, Price_id,
    // order_id and user_id are auto_increment, so MySQL makes them.
    const {
        Product_url, Product_name,
        Product_brief_description, Product_description, Product_img, Product_link,
        Starting_price, Price_range,
        User_name, User_password
    } = req.body;

    // Stop early if something is missing
    if (!Product_url || !Product_name || !Product_brief_description || !Product_description ||
        !Product_img || !Product_link || !Starting_price || !Price_range ||
        !User_name || !User_password) {
        return res.status(400).send("Missing fields in request body");
    }

    // CHANGED: ? placeholders instead of hardcoded values
    let insertProducts = "INSERT INTO Products (Product_url, Product_name) VALUES (?, ?)";

    // CHANGED: values passed in an array, in the same order as the ?
    connection.query(insertProducts, [Product_url, Product_name], (err, result) => {

        if (err) {
            console.log("ERROR", err);
            return res.end(err.message);
        }

        let id = result.insertId;   // id of the product just inserted

        let insertDescription = "INSERT INTO ProductDescription (Product_id, Product_brief_description, Product_description, Product_img, Product_link) VALUES (?, ?, ?, ?, ?)";

        let insertPrice = "INSERT INTO ProductPrice (Product_id, Starting_price, Price_range) VALUES (?, ?, ?)";

        // FIXED: removed user_id from the column list
        let insertUser = "INSERT INTO User (User_name, User_password) VALUES (?, ?)";

        connection.query(insertDescription, [id, Product_brief_description, Product_description, Product_img, Product_link], (err) => {
            if (err) {
                console.log(err);
                return res.end(err.message);
            }

            connection.query(insertPrice, [id, Starting_price, Price_range], (err) => {
                if (err) {
                    console.log(err);
                    return res.end(err.message);
                }

                connection.query(insertUser, [User_name, User_password], (err, userResult) => {
                    if (err) {
                        console.log(err);
                        return res.end(err.message);
                    }

                    let insertOrders = "INSERT INTO Orders (Product_id, user_id) VALUES (?, ?)";

                    connection.query(insertOrders, [id, userResult.insertId], (err) => {
                        if (err) {
                            console.log(err);
                            return res.end(err.message);
                        }

                        res.send("DATA INSERTED");
                    });   // closes insertOrders
                });       // closes insertUser
            });           // closes insertPrice
        });               // closes insertDescription
    });                   // closes insertProducts
});                       // closes app.post