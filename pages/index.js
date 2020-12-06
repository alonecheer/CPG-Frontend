import Axios from "axios";
import Router from "next/dist/next-server/server/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [number, setNumber] = useState("");
  const [width, setWidth] = useState("");
  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    let result = await Axios.get("http://localhost:3001/product/stock");
    setData(result.data);
  };
  const addProduct = async () => {
    console.log(size, color, number, width);
    let result = await Axios.post(`http://localhost:3001/product/addstock`, {
      size: size,
      number: number,
      color: color,
      width: width,
    });
  };

  const addDelete = async (id) => {
    let result = await Axios.delete(
      `http://localhost:3001/product/stock/delete/${id}`
    );
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <h3>Size</h3>
      <input name="Size" onChange={(e) => setSize(e.target.value)}></input>
      <h3>Color</h3>
      <input name="Color" onChange={(e) => setColor(e.target.value)}></input>
      <h3>Number</h3>
      <input name="number" onChange={(e) => setNumber(e.target.value)}></input>
      <h3>Width</h3>
      <input name="width" onChange={(e) => setWidth(e.target.value)}></input>
      <button type="submit" onClick={() => addProduct()}>
        Add Product
      </button>
      <h1>Stock</h1>

      {data.map((item, index) => {
        return (
          <div key={index}>
            ID: {item.id}
            SIZE:{item.size}
            COLOR:{item.color}
            NUMBER:{item.number}
            <button type="button" onClick={() => addDelete(item.id)}>
              Delete
            </button>
            <button
              onClick={(item) => {
                router.push({
                  pathname: "/changeproduct",
                  query: { id: item.id },
                });
              }}
            >
              Change
            </button>
            <br></br>
          </div>
        );
      })}
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
