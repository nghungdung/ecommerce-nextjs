import Head from "next/head"
import { useState, useContext } from "react"
import { DataContext } from "@/store/GlobalState"
import { set } from "mongoose"

const ProductsManager = () => {
    const initialState = {
        product_id: "",
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: ''
    }
    const[product, setProduct] = useState(initialState)
    const{product_id, title, price, inStock, description, content, category} = product

    const [images, setImages] = useState([])

    const {state, dispatch} = useContext(DataContext)
    const {categories} = state

    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
        dispatch({type: 'NOTIFY', payload: {}})
    }

    const handleUploadInput = e => {
        dispatch({type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]
        
        if(files.length === 0) 
            return dispatch({type: 'NOTIFY', payload: {error: 'Files does not exist.'}})

        files.forEach(file => {
            if(file.size > 1024 * 1024)
                return err = 'The largest img size is 1mb'

            if(file.type !== 'image/jpg' && file.type !== 'image/png')
                return err = 'Image format is incorrect'
            
            num += 1
            if(num <= 5) newImages.push(file)
                return newImages
                
        })

        if(err) dispatch({type: 'NOTIFY', payload: {error: err}})

        const imgCount = images.length
        if(imgCount + newImages.length > 5)
        return dispatch({type: 'NOTIFY', payload: {error: 'Select up to 5 images'}})
        setImages([...images, ...newImages])

    }

    return(
        <div className="products_manager">
            <Head>
                <title>Products Manager</title>
            </Head>

            <form className="row">
                <div className="col-md-6">
                    <input type="text" name="product_id" value={product_id}
                    placeholder="Product ID" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput}/>

                    <input type="text" name="title" value={title}
                    placeholder="Product Title" className="d-block my-4 w-100 p-2"
                    onChange={handleChangeInput}/>

                    <div className="row">
                        <div className="col-sm-6">
                            <input type="number" name="price" value={price}
                            placeholder="Product Price" className="d-block my-4 w-100 p-2"
                            onChange={handleChangeInput}/>
                        </div>

                        <div className="col-sm-6">
                            <input type="number" name="inStock" value={inStock}
                            placeholder="Product inStock" className="d-block my-4 w-100 p-2"
                            onChange={handleChangeInput}/>
                        </div>     
                    </div>

                    <textarea name="description" id="description" cols="30" rows="4"
                    placeholder="Description" onChange={handleChangeInput} className="d-block my-4 w-100 p-2"/>

                    <textarea name="content" id="content" cols="30" rows="6"
                    placeholder="Content" onChange={handleChangeInput} className="d-block my-4 w-100 p-2"/>
                
                    <div className="input-group-prepend px-0 my-2">
                        <select name="category" id="category" value={category}
                        onChange={handleChangeInput} className="custom-select text-capitalize">
                            <option value="all">All Products</option>
                            {
                                categories.map(item => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                
                </div>

                <div className="col-md-6 my-4">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Upload</span>
                        </div>

                        <div className="custom-file border rounded">
                            <input type="file" className="custom-file-input"
                            onChange={handleUploadInput} multiple/>
                        </div>
                    </div>

                    <div className="row img-up">
                        {
                            images.map((img, index) => (
                                <div key={index} className="file_img">
                                    <img src={img.url ? img.url : URL.createObjectURL(img)}
                                    alt="" className="img-thumbnail rounded"/>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ProductsManager