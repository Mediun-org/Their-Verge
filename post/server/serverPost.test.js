const puppeteer = require ('puppeteer')
const { test1, func2 } = require("./unit.js");

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

test("return haha <name>", () => {
  var t = test1("really? -_-");
  expect(t).toBe("haha really? -_-");
});

test("return num1+num2  * num3", () => {
    var result = func2(1, 1, 2);
    expect(result).toBe(4);
});

// test("browser", async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         args: ['--window-size=900,900'],
//         slowMo: 70
//     });
//     const page = await browser.newPage();
//     await page.goto('http://localhost:3001/?id=10')
// });

const request = require('supertest');
const app = require('./app')

describe('Test the server', () => {
    test('see if the get works', () => {
        return request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
});

// // it('works with async/await', async () => {
// //     expect.assertions(1);
// //     const data = await user.getUserName(4);
// //     expect(data).toEqual('Mark');
// // });

const {MongoClient} = require('mongodb');


describe('insert', () => {
  let connection;
  let db;
  let uri = 'mongodb+srv://hend:sleepyash@cluster0-ozydj.mongodb.net/TheVerge?retryWrites=true&w=majority';
  let mdb = "TheVerge";

  beforeAll(async () => {
      connection = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = await connection.db(mdb);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should insert a doc into collection', async () => {
    const authors = db.collection('authors');
    var x = Date.now();
    const mockAuthor = {
        id: x,
        name: 'notOne',
        password: 'ireallyWannaSleeeep',
        email: `${x}@gmail.com`,
        imgUrl: "http://eskipaper.com/images/blue-space-1.jpg"
    };
    await authors.insertOne(mockAuthor);

    const insertedAuthor = await authors.findOne({id: x});
    expect(insertedAuthor).toEqual(mockAuthor);
  });
});