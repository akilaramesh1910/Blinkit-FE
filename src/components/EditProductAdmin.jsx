import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import SuccessAlert from "../utils/SuccessAlert";

const EditProductAdmin = ({close, data: propsData, fetchProductData}) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [loading, setLoading] = useState(false);
  const [viewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [moreField, setMoreField] = useState({});
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const response = await UploadImage(file);

    const { data: responseData } = response;
    const imageUrl = responseData.data.url;

    setData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });

    setLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleAddField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        SuccessAlert(responseData.message);
        if(close) {
            close()
        }
        if(fetchProductData) {
            fetchProductData()
        }
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    SuccessAlert("Upload Successfully");
  }, []);
  
  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded p-4 overflow-y-auto h-full max-h-[95vh]">
        <section>
          <div className="p-2 bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Edit Product</h2>
            <button onClick={close}>
                <IoClose size={25}/>
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Enter product description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div>
                <p className="font-medium">Image</p>
                <div>
                  <label
                    htmlFor="uploadImage"
                    className="bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer"
                  >
                    <div className="text-center flex justify-center items-center flex-col">
                      {loading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="uploadImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {data.image.map((img, index) => {
                      return (
                        <div
                          key={img + index}
                          className="w-20 h-20 mt-1 min-w-20 bg-blue-50 border relative group"
                        >
                          <img
                            src={img}
                            alt={img}
                            className="w-full h-full object-scale-down cursor-pointer"
                            onClick={() => setViewImageURL(img)}
                          />
                          <div
                            className="absolute top-0 right-0 p-1 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer text-white hidden group-hover:block"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Category
                </label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find(
                        (el) => el._id === value
                      );
                      setData((prev) => {
                        return {
                          ...prev,
                          category: [...prev.category, category],
                        };
                      });
                      setSelectCategory("");
                    }}
                  >
                    <option>Select Category</option>
                    {allCategory.map((category, index) => {
                      return (
                        <option value={category._id}>{category.name}</option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((category, index) => {
                      return (
                        <div
                          key={category._id + index + "product"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{category.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="" className="font-medium">
                  Sub Category
                </label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find(
                        (el) => el._id === value
                      );
                      setData((prev) => {
                        return {
                          ...prev,
                          subCategory: [...prev.subCategory, subCategory],
                        };
                      });
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""} className="text-neutral-600">
                      Select Sub Category
                    </option>
                    {allSubCategory.map((category, index) => {
                      return (
                        <option value={category._id}>{category.name}</option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.subCategory.map((category, index) => {
                      return (
                        <div
                          key={category._id + index + "subCategory"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{category.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveSubCategory(index)}
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <label htmlFor="unit" className="font-medium">
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  name="unit"
                  placeholder="Enter product unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="stock" className="font-medium">
                  Number of Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  name="stock"
                  placeholder="Enter product stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Enter product price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  placeholder="Enter product discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              {Object?.keys(data.more_details)?.map((k, index) => {
                return (
                  <div className="grid gap-1">
                    <label htmlFor={k} className="font-medium">
                      {k}
                    </label>
                    <input
                      id={k}
                      type="text"
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                    />
                  </div>
                );
              })}
              <div
                className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 rounded cursor-pointer hover:text-neutral-900"
                onClick={() => setOpenAddField(true)}
              >
                Add Fields
              </div>
              <button className="bg-primary-200 hover:bg-primary-200 py-2 rounded font-semibold">
                Update Product
              </button>
            </form>
          </div>

          {viewImageURL && (
            <ViewImage url={viewImageURL} close={() => setViewImageURL("")} />
          )}

          {openAddField && (
            <AddFieldComponent
              close={() => setOpenAddField(false)}
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              submit={handleAddField}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
