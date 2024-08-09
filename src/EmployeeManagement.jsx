import React, { useEffect, useState } from 'react';
import './App.css';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

const EmployeeManagement = () => {
  const { index } = useParams(); // Get the index from the URL parameters
  const [formData, setFormData] = useState({
    productNumber: '',
    productName: '',
    productDescription: '',
    price: '',
    quantity: '',
    productCategory: '',
    subCategory: '',
    manufacturingDate: '',
    expiryDate: '',
    cGST: '',
    sGST: '',
    project: '',
    client: '',
    billRate: '',
    effectiveDate: '',
    price: '',
    serviceTax: '',
    description: ''
  });
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formType, setFormType] = useState(''); // State to track which form to display
  const [isProductFormVisible, setIsProductFormVisible] = useState(false);
  const [isEmployeeFormVisible, setIsEmployeeFormVisible] = useState(false); // Employee form visibility
  const [isListVisible, setIsListVisible] = useState(false);
  const billingRates = ['PerHour', 'PerDay', 'PerWeek', 'PerMonth'];

  useEffect(() => {
    if (products.length > 0) {
      setIsListVisible(true);
    }
  }, [products]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map((product, i) => (i === editIndex ? formData : product)));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setProducts([...products, { ...formData, type: formType }]);
    }
    setFormData({
      productNumber: '',
      productName: '',
      productDescription: '',
      price: '',
      quantity: '',
      productCategory: '',
      subCategory: '',
      manufacturingDate: '',
      expiryDate: '',
      cGST: '',
      sGST: '',
      employee:'',
      project: '',
      client: '',
      billingRate: '',
      effectiveDate: '',
      price: '',
      serviceTax: '',
      description: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setFormData(products[index]);
    setFormType(products[index].type);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
    if (selectedProduct && index === products.indexOf(selectedProduct)) {
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (index) => {
    setSelectedProduct(selectedProduct === products[index] ? null : products[index]);
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setFormData({
      productNumber: '',
      productName: '',
      productDescription: '',
      price: '',
      quantity: 1,
      productCategory: '',
      subCategory: '',
      manufacturingDate: '',
      expiryDate: '',
      cGST: '',
      sGST: '',
      project: '',
      client: '',
      billingRate: '',
      serviceTax: '',
      description: ''
    });

    if (type === 'product') {
      setIsProductFormVisible(!isProductFormVisible);
      setIsEmployeeFormVisible(false);
    } else if (type === 'employee') {
      setIsEmployeeFormVisible(!isEmployeeFormVisible);
      setIsProductFormVisible(false);
    }
  };

  const [productCategories, setProductCategories] = useState([
    { value: '', label: 'Select Category' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'food', label: 'Food' },
  ]);
  const [subCategories, setSubCategories] = useState({
    electronics: [
      { value: '', label: 'Select Sub Category' },
      { value: 'phones', label: 'Phones' },
      { value: 'computers', label: 'Computers' },
      { value: 'accessories', label: 'Accessories' },
    ],
    clothing: [
      { value: '', label: 'Select Sub Category' },
      { value: 'men', label: 'Men' },
      { value: 'women', label: 'Women' },
      { value: 'kids', label: 'Kids' },
    ],
    food: [
      { value: '', label: 'Select Sub Category' },
      { value: 'fruits', label: 'Fruits' },
      { value: 'vegetables', label: 'Vegetables' },
      { value: 'snacks', label: 'Snacks' },
    ],
  });
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategory.value === 'addNew') {
      const newCategory = prompt('Enter new category:');
      if (newCategory) {
        setProductCategories([
          ...productCategories,
          { value: newCategory.toLowerCase(), label: newCategory }
        ]);
        setFormData((prevData) => ({
          ...prevData,
          productCategory: newCategory.toLowerCase(),
        }));
        setSubCategories((prevSubCategories) => ({
          ...prevSubCategories,
          [newCategory.toLowerCase()]: [{ value: '', label: 'Select Sub Category' }]
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        productCategory: selectedCategory.value,
      }));
    }
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    if (selectedSubCategory.value === 'addNew') {
      const newSubCategory = prompt('Enter new subcategory:');
      if (newSubCategory) {
        setSubCategories((prevSubCategories) => ({
          ...prevSubCategories,
          [formData.productCategory]: [
            ...prevSubCategories[formData.productCategory],
            { value: newSubCategory.toLowerCase(), label: newSubCategory }
          ],
        }));
        setFormData((prevData) => ({
          ...prevData,
          subCategory: newSubCategory.toLowerCase(),
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        subCategory: selectedSubCategory.value,
      }));
    }
  };
  const employeeOptions = [
    { value: 'employee1', label: 'Employee 1' },
    { value: 'employee2', label: 'Employee 2' },
    { value: 'employee3', label: 'Employee 3' },
  ];
  const clientOptions = [
    {value: 'client1', label: 'Client 1'},
    {value: 'client2', label: 'client 2'},
    {value: 'client3', label: 'client 3'},
  ]
  const projectOptions = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
    { value: 'project3', label: 'Project 3' },
  ];

  // Options for the client dropdown
  
  return (
    <div className="ProductDetails">
      <h5 style={{color:'black'}}>Select Product / Service  {index}</h5> {/* Display the index from URL parameters */}
      <div className="salesContainer">
      <div className="menu">
      <div className="menu-items" style={{backgroundColor:'white', marginLeft:'50px'}}>
        <button onClick={() => handleFormTypeChange('product')} style={{backgroundColor:'#db450e', marginRight:'10px', width:'2000px'}}>PRODUCT</button>
      
        <button onClick={() => handleFormTypeChange('employee')} style={{backgroundColor:'#db450e',marginLeft:'10px', width:'2000px'}}>SERVICE</button>
      </div>
      </div>
      </div>
      <div className="forms-container">
        {isProductFormVisible && (
          <div className="form-section" >
            <h4>Fill The Details of Product</h4>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                    <tr>
                <td>Product Category:</td>
                <td>
              <Select
                options={[...productCategories, { value: 'addNew', label: 'Add New' }]}
                value={productCategories.find(cat => cat.value === formData.productCategory)}
                onChange={handleCategoryChange}
              />
            </td>
            </tr>
            <tr className="form-group">
              <td>Sub Category:</td>
              <td>
              <Select
                options={formData.productCategory ?
                  [...subCategories[formData.productCategory] || [], { value: 'addNew', label: 'Add New' }] :
                  [{ value: '', label: 'Select Category First' }]
                }
                value={formData.productCategory ?
                  subCategories[formData.productCategory]?.find(subCat => subCat.value === formData.subCategory) :
                  null
                }
                onChange={handleSubCategoryChange}
              />
            </td>
            </tr>

                  <tr>
                    <td>Product Number:</td>
                    <td>
                      <input
                        type="text"
                        name="productNumber"
                        value={formData.productNumber}
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
                    <td>Product Description:</td>
                    <td>
                      <input
                        type="text"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Price/Unit:</td>
                    <td>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
  <td>Quantity:</td>
  <td>
    <input
      type="number" // Use type "number" for quantity
      name="quantity"
      value={formData.quantity}
      onChange={handleChange}
    />
  </td>
</tr>
                  <tr>
                    <td>Manufacturing Date:</td>
                    <td>
                      <input
                        type="text"
                        name="manufacturingDate"
                        value={formData.manufacturingDate}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Expiry Date:</td>
                    <td>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>CGST % (If Applicable):</td>
                    <td>
                      <input
                        type="text"
                        name="cGST"
                        value={formData.cGST}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SGST % (If Applicable):</td>
                    <td>
                      <input
                        type="text"
                        name="sGST"
                        value={formData.sGST}
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">{isEditing ? 'Save' : 'Add'}</button>
            </form>
          </div>
        )}
        {isEmployeeFormVisible && (
          <div className="form-section">
            <h4> Fill The Details for Service</h4>
            <form onSubmit={handleSubmit}>
              <table>
                <tbody>
                <tr>
        <td>Employee:</td>
        <td>
        <Select
          value={{ value: formData.employee, label: formData.employee }}
          options={employeeOptions}
          onChange={(selectedOption) => setFormData({ ...formData, employee: selectedOption.value })}
        />
      </td>
      </tr>
                <tr>
        <td>Client:</td>
        <td>
        <Select
          value={{ value: formData.client, label: formData.client }}
          options={clientOptions}
          onChange={(selectedOption) => setFormData({ ...formData, client: selectedOption.value })}
        />
      </td>
      </tr>
                <tr>
        <td>Project:</td>
        <td>
        <Select
          value={{ value: formData.project, label: formData.project }}
          options={projectOptions}
          onChange={(selectedOption) => setFormData({ ...formData, project: selectedOption.value })}
        />
      </td>
      </tr>
      {/* Dropdown for client */}
      
      <tr>
  <td>Billing Rate:</td>
  <td>
    <select
      value={formData.billingRate}
      onChange={(e) => handleChange(e)}
      name="billingRate"
    >
      <option value="">Select</option>
      {billingRates.map((rate, index) => (
        <option key={index} value={rate}>
          {rate}
        </option>
      ))}
    </select>
    {/* Render "Effective Date" and "Price" fields when "PerHour", "PerDay", "PerWeek", or "PerMonth" options are selected */}
    {['PerHour', 'PerDay', 'PerWeek', 'PerMonth'].includes(formData.billingRate) && (
      <div>
        <label htmlFor="effectiveDate">Effective Date:</label>
        <input
          type="date"
          id="effectiveDate"
          name="effectiveDate"
          value={formData.effectiveDate}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="price">Price/Unit:</label>
        <input
           type="number"
           id="price"
           name="price"
           value={formData.price}
           onChange={(e) => handleChange(e)}
                />
                </div>
                 )}
                </td>
                 </tr>
                  <tr>
                    <td>Service Tax % (If Applicable):</td>
                    <td>
                      <input
                        type="text"
                        name="serviceTax"
                        value={formData.serviceTax}
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
                </tbody>
              </table>
              <button type="submit">{isEditing ? 'Save' : 'Add'}</button>
            </form>
          </div>
        )}
      </div>
      {isListVisible && (
       
      
      <div>
        <h4 style={{color:'black'}}>List</h4>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td onClick={() => handleProductClick(index)}>
                  {product.type === 'product' ? product.productName : product.project}
                </td>
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
      )}
      {selectedProduct && (
        <div>
          <h4>Selected Details</h4>
          <table>
            <tbody>
              {selectedProduct.type === 'product' ? (
                <>
                  <tr>
                    <td>Product Category:</td>
                    <td>{selectedProduct.productCategory}</td>
                  </tr>
                  <tr>
                    <td>Sub Category:</td>
                    <td>{selectedProduct.subCategory}</td>
                  </tr>
                  <tr>
                    <td>Product Number:</td>
                    <td>{selectedProduct.productNumber}</td>
                  </tr>
                  <tr>
                    <td>Product Name:</td>
                    <td>{selectedProduct.productName}</td>
                  </tr>
                  <tr>
                    <td>Product Description:</td>
                    <td>{selectedProduct.productDescription}</td>
                  </tr>
                  <tr>
                    <td>Price/Unit:</td>
                    <td>{selectedProduct.price}</td>
                  </tr>
                  <tr>
                    <td>Quantity:</td>
                    <td>{selectedProduct.quantity}</td>
                  </tr>
                  <tr>
                    <td>Manufacturing Date:</td>
                    <td>{selectedProduct.manufacturingDate}</td>
                  </tr>
                  <tr>
                    <td>Expiry Date:</td>
                    <td>{selectedProduct.expiryDate}</td>
                  </tr>
                  <tr>
                    <td>CGST % (If Applicable):</td>
                    <td>{selectedProduct.cGST}</td>
                  </tr>
                  <tr>
                    <td>SGST % (If Applicable):</td>
                    <td>{selectedProduct.sGST}</td>
                  </tr>
                </>
              ) : (
                <>
                <tr>
                    <td>Employee:</td>
                    <td>{selectedProduct.employee}</td>
                    </tr>
                    <tr>
                    <td>Client:</td>
                    <td>{selectedProduct.client}</td>
                  </tr>
                  <tr>
                    <td>Project:</td>
                    <td>{selectedProduct.project}</td>
                  </tr>
                  <tr>
                <td>Billing Rate:</td>
                <td>
                  {selectedProduct.billingRate}
                </td>
                </tr>
                <tr>
                <td>Effective Date:</td>
                <td>
                  {selectedProduct.effectiveDate}
                </td>
                 </tr>
                 <tr>
                <td>Price:</td>
                <td>
                  {selectedProduct.price}
                </td>
                 </tr>
      
                  <tr>
                    <td>Service Tax % (If Applicable):</td>
                    <td>{selectedProduct.serviceTax}</td>
                  </tr>
                  <tr>
                    <td>Description:</td>
                    <td>{selectedProduct.description}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;
