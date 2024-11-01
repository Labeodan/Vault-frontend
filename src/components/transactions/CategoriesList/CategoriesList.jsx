
export const CategoriesSelect = ({ categories, selected, handleChange }) => {
    console.log("selected", selected);
    return (<select onChange={(e) => { handleChange(e) }} name="category">

        {
            categories.map((category, index) => {
                console.log()
                //return (<Transaction transaction={transaction}></Transaction>)
                return (<option key={index} value={category._id} selected={category.name == selected ? 'Selected' : ''}> {category.name}   </option>)

            })
        }
    </select>
    );

}