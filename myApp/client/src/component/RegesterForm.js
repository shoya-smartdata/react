import React, { useState } from "react";
import styles from "./regester.module.css";
import axios from "axios";
import toast from "react-hot-toast";

function RegesterForm() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");

  const handleSubmi = async (event) => {
    event.preventDefault();

    const data = {
      id: value1,
      name: value2,
      email: value3,
      phone: value4,
      address: value5,
    };

    try {
      const response = await axios.post("http://localhost:4000/addData", data);
      toast.success("user regestered  successfully !", response.data.name);
      setValue1("");
      setValue2("");
      setValue3("");
      setValue4("");
      setValue5("");
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <section className={`${styles.customreg}`}>
        <div className="w-50  flex container  justify-content-center ">
          <form
            className={`${styles.formstyle} h-50 mt-3  shadow w-50 rounded bg-light`}
            onSubmit={handleSubmi}
          >
             <h3>Fill up !</h3>
            <label>Id</label>
            <input
              type="text"
              placeholder="enter valid id"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="rounded shadow py-0 my-0"
            />
            <br />
            <label>Name</label>
            <input
              type="text"
              placeholder="enter name"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="rounded shadow py-0 my-0"
            />
            <br />
            <label>Email</label>
            <input
              type="text"
              placeholder="enter email"
              value={value3}
              onChange={(e) => setValue3(e.target.value)}
              className="rounded shadow"
            />
            <br />

            <label>Phone</label>
            <input
              type="text"
              placeholder="enter phone no"
              value={value4}
              onChange={(e) => setValue4(e.target.value)}
              className="rounded shadow"
            />
            <br />
            <label>Address</label>
            <input
              type="text"
              placeholder="enter address"
              value={value5}
              onChange={(e) => setValue5(e.target.value)}
              className="rounded shadow"
            />
            <br />
            <button className="btn bg-primary text-light m-1 " type="submit">
              Submit!
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default RegesterForm;
