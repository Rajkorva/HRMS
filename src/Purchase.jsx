import React, { useState } from 'react';
import './App.css';
import { useParams, useNavigate } from 'react-router-dom';

const Purchase = () => {
  const { index } = useParams();
  const [formData, setFormData] = useState({
    vendorName: '',
    projectName: '',
    productCategory: '',
    subCategory: '',
    shippingAddress: '',
    todaysDate: '',
    purchaseOrder: '',
    productType: '',
    productName: '',
    productDetail: '',
    description: '',
    quantity: '',
    unit: '',
    pricePerUnit: '',
    discount: '',
    subTotal: '',
    hsnCode: '',
    cgstPercentage: '',
    cgstValue: '',
    sgstPercentage: '',
    sgstValue: '',
    totalAmount: ''
  });

  const [vendors, setVendors] = useState([]);
  const [projects, setProjects] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPurchases(purchases.map((purchase, i) => (i === editIndex ? formData : purchase)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setPurchases([...purchases, formData]);
    }
    // Clear form data after submit
    setFormData({
      vendorName: '',
      projectName: '',
      productCategory: '',
      subCategory: '',
      shippingAddress: '',
      todaysDate: '',
      purchaseOrder: '',
      productType: '',
      productName: '',
      productDetail: '',
      description: '',
      quantity: '',
      unit: '',
      pricePerUnit: '',
      discount: '',
      subTotal: '',
      hsnCode: '',
      cgstPercentage: '',
      cgstValue: '',
      sgstPercentage: '',
      sgstValue: '',
      totalAmount: ''
    });
    // Update selectedPurchase if it matches the newly added/edited purchase
    if (selectedPurchase) {
      const selectedIndex = purchases.findIndex((purchase) => purchase === selectedPurchase);
      if (selectedIndex !== -1) {
        setSelectedPurchase(purchases[selectedIndex]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const handleAddOption = (type) => {
    const newOption = prompt(`Enter new ${type}`);
    if (newOption) {
      switch (type) {
        case 'Vendor':
          setVendors([...vendors, newOption]);
          setFormData({ ...formData, vendorName: newOption });
          break;
        case 'Project':
          setProjects([...projects, newOption]);
          setFormData({ ...formData, projectName: newOption });
          break;
        case 'Product Category':
          setProductCategories([...productCategories, newOption]);
          setFormData({ ...formData, productCategory: newOption });
          break;
        case 'Sub Category':
          setSubCategories([...subCategories, newOption]);
          setFormData({ ...formData, subCategory: newOption });
          break;
        default:
          break;
      }
    }
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(purchases[index]);
  };

  const handleDelete = (index) => {
    setPurchases(purchases.filter((_, i) => i !== index));
    if (selectedPurchase && index === purchases.indexOf(selectedPurchase)) {
      setSelectedPurchase(null);
    }
  };

  const handlePurchaseClick = (index) => {
    setSelectedPurchase(selectedPurchase === purchases[index] ? null : purchases[index]);
  };

  return (
    <div className="PurchaseDetails" style={{width:'90%'}}>
      <h5>Purchase Order Details {index}</h5>
      <form>
        <table>
          <tbody>
            <tr>
              <td>Vendor Name:</td>
              <td>
                <select name="vendorName" value={formData.vendorName} onChange={handleChange}>
                  <option value="">Select Vendor</option>
                  {vendors.map((vendor, index) => (
                    <option key={index} value={vendor}>{vendor}</option>
                  ))}
                </select>
                <button type="button" onClick={() => handleAddOption('Vendor')}>Add New</button>
              </td>
            </tr>
            <tr>
              <td>Project Name:</td>
              <td>
                <select name="projectName" value={formData.projectName} onChange={handleChange}>
                  <option value="">Select Project</option>
                  {projects.map((project, index) => (
                    <option key={index} value={project}>{project}</option>
                  ))}
                </select>
                <button type="button" onClick={() => handleAddOption('Project')}>Add New</button>
              </td>
            </tr>
            <tr>
              <td>Product Category:</td>
              <td>
                <select name="productCategory" value={formData.productCategory} onChange={handleChange}>
                  <option value="">Select Category</option>
                  {productCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
                <button type="button" onClick={() => handleAddOption('Product Category')}>Add New</button>
              </td>
            </tr>
            <tr>
              <td>Sub Category:</td>
              <td>
                <select name="subCategory" value={formData.subCategory} onChange={handleChange}>
                  <option value="">Select Sub Category</option>
                  {subCategories.map((subcategory, index) => (
                    <option key={index} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
                <button type="button" onClick={() => handleAddOption('Sub Category')}>Add New</button>
              </td>
            </tr>
            <tr>
              <td>Shipping Address:</td>
              <td>
                <input
                  type="text"
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Today's Date:</td>
              <td>
                <input
                  type="date"
                  name="todaysDate"
                  value={formData.todaysDate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Purchase Order #:</td>
              <td>
                <input
                  type="text"
                  name="purchaseOrder"
                  value={formData.purchaseOrder}
                  onChange={handleChange}
                  
                />
              </td>
            </tr>
            <tr>
              <td>Product Type:</td>
              <td>
                <input
                  type="text"
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Name:</td>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Product Detail:</td>
              <td>
                <input
                  type="text"
                  name="productDetail"
                  value={formData.productDetail}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Quantity:</td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Unit:</td>
              <td>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Price/Unit:</td>
              <td>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Discount:</td>
              <td>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>SubTotal:</td>
              <td>
                <input
                  type="number"
                  name="subTotal"
                  value={formData.subTotal}
                  onChange={handleChange}
                  
                />
              </td>
            </tr>
            <tr>
              <td>HSN/SBC Code:</td>
              <td>
                <input
                  type="text"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>CGST %:</td>
              <td>
              <td>CGST % </td>

                <input
                  type="number"
                  name="cgstPercentage"
                  value={formData.cgstPercentage}
                  onChange={handleChange}
                />
              <td>CGST Value:</td>
              
                <input
                  type="number"
                  name="cgstValue"
                  value={formData.cgstValue}
                  onChange={handleChange}
                  readOnly
               
                  />
                  
                  </td>
                </tr>
                <tr>
                  <td>SGST %:</td>
                  <td>
                  <td>SGST %:</td>
                    <input
                      type="number"
                      name="sgstPercentage"
                      value={formData.sgstPercentage}
                      onChange={handleChange}
                    />
                  
                  <td>SGST Value:</td>
                  
                    <input
                      type="number"
                      name="sgstValue"
                      value={formData.sgstValue}
                      onChange={handleChange}
                      readOnly
                    />
                    </td>
                  
                </tr>
                <tr>
                  <td>Total Amount:</td>
                  <td>
                    <input
                      type="number"
                      name="totalAmount"
                      value={formData.totalAmount}
                      onChange={handleChange}
                      
                    />
                  </td>
                </tr>
                <tr className="currency">
                  <td>Currency:</td>
                  <td>
                    <select
                      name="currency"
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      <option value="$">USD</option>
                      <option value="€">EUR</option>
                      <option value="£">GBP</option>
                      <option value="¥">JPY</option>
                      <option value="₹">INR</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
               <button onClick={handleSubmit}type="submit" style={{width:'50%', marginLeft:'225px'}}>{isEditing ? 'Save' : 'Submit'}</button>
           
          </form>
          <div style={{width:'95%'}}>
       <h4>Purchase List</h4>
        <table>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td onClick={() => handlePurchaseClick(index)}>{purchase.projectName}</td>
                <td>
                  {!isEditing && (
                    <>
                      <button onClick={() => handleEdit(index)}><i className="fa fa-pencil-square-o"></i></button>
                      <button onClick={() => handleDelete(index)}><i className="fa fa-trash"></i></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
                  </div>
                  {selectedPurchase && (
  <div>
    <h4>Selected Purchase Details</h4>
    <table>
      <tbody>
        <tr>
          <td>Vendor Name:</td>
          <td>{selectedPurchase.vendorName}</td>
        </tr>
        <tr>
          <td>Project Name:</td>
          <td>{selectedPurchase.projectName}</td>
        </tr>
                  <tr>
                    <td>Product Category:</td>
                    <td>{selectedPurchase.productCategory}</td>
                  </tr>
                  <tr>
                    <td>Sub Category:</td>
                    <td>{selectedPurchase.subCategory}</td>
                  </tr>
                  <tr>
                    <td>Shipping Address:</td>
                    <td>{selectedPurchase.shippingAddress}</td>
                  </tr>
                  <tr>
                    <td>Today's Date:</td>
                    <td>{selectedPurchase.todaysDate}</td>
                  </tr>
                  <tr>
                    <td>Purchase Order #:</td>
                    <td>{selectedPurchase.purchaseOrder}</td>
                  </tr>
                  <tr>
                    <td>Product Type:</td>
                    <td>{selectedPurchase.productType}</td>
                  </tr>
                  <tr>
                    <td>Product Name:</td>
                    <td>{selectedPurchase.productName}</td>
                  </tr>
                  <tr>
                    <td>Product Detail:</td>
                    <td>{selectedPurchase.productDetail}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{selectedPurchase.description}</td>
                  </tr>
                  <tr>
                    <td>Quantity:</td>
                    <td>{selectedPurchase.quantity}</td>
                  </tr>
                  <tr>
                    <td>Unit:</td>
                    <td>{selectedPurchase.unit}</td>
                  </tr>
                  <tr>
                    <td>Price/Unit:</td>
                    <td>{selectedPurchase.pricePerUnit}</td>
                  </tr>
                  <tr>
                    <td>Discount:</td>
                    <td>{selectedPurchase.discount}</td>
                  </tr>
                  <tr>
                    <td>SubTotal:</td>
                    <td>{selectedPurchase.subTotal}</td>
                  </tr>
                  <tr>
                    <td>HSN/SBC Code:</td>
                    <td>{selectedPurchase.hsnCode}</td>
                  </tr>
                  <tr>
                    <td>CGST %:</td>
                    <td>{selectedPurchase.cgstPercentage}</td>
                    <td>CGST Value:</td>
                    <td>{selectedPurchase.cgstValue}</td>
                  </tr>
                  <tr>
                    <td>SGST %:</td>
                    <td>{selectedPurchase.sgstPercentage}</td>
                    <td>SGST Value:</td>
                    <td>{selectedPurchase.sgstValue}</td>
                  </tr>
                  <tr>
                    <td>Total Amount:</td>
                    <td>{selectedPurchase.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    };
    
    export default Purchase;
    