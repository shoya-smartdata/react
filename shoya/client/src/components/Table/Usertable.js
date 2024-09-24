import React from 'react';
import styles from './table.module.css';

function Usertable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>(123) 456-7890</td>
            <td>123 Main St, City, Country</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>(234) 567-8901</td>
            <td>456 Elm St, City, Country</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mike Johnson</td>
            <td>mike.johnson@example.com</td>
            <td>(345) 678-9012</td>
            <td>789 Maple St, City, Country</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Usertable;
