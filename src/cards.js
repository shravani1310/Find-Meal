import './App.css';
import { useState, useEffect } from "react"; // useEffect to manage side effects
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select'; // React Select for dropdown

export function CardDefault() {
    const [recipename, setrecipename] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); 
    const [calorieRange, setCalorieRange] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const searchTerm = location.state?.searchTerm || ''; // Search term passed via navigation state
    const limit = 30;

    // Fetch recipes based on page number
    useEffect(() => {
        const fetchAllRecipes = async () => {
            const skip = (currentPage - 1) * limit;
            const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`);
            const data = await response.json();
            setrecipename(data.recipes);
            setFilteredRecipes(data.recipes); 
            setTotalPages(Math.ceil(data.total / limit));
        };

        fetchAllRecipes();
    }, [currentPage]);

    
    function openRecipe(id) {
        navigate("/Page", { state: { id } });
    }

    // Filter recipes based on the search term or tags
    useEffect(() => {
        const filtered = recipename.filter(recipe => {
            const matchesFilterOptions = !selectedOption || (
                (recipe.cuisine && recipe.cuisine.toLowerCase() === selectedOption.value.toLowerCase()) || 
                (recipe.difficulty && recipe.difficulty.toLowerCase() === selectedOption.value.toLowerCase()) || 
                (recipe.mealType && recipe.mealType.some(type => type.toLowerCase().includes(selectedOption.value.toLowerCase())))
            );
    
            // Search term filtering (tags and ingredients)
            const matchesSearch = 
                (recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) ||
                (recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase())));
    
            // Calorie range filtering
            const matchesCalories = !calorieRange || 
                (calorieRange.value === '<150' && recipe.caloriesPerServing < 150) ||
                (calorieRange.value === '<250' && recipe.caloriesPerServing < 250) ||
                (calorieRange.value === '<350' && recipe.caloriesPerServing < 350) ||
                (calorieRange.value === '>=350' && recipe.caloriesPerServing >= 350);
    
            // Return true only if the recipe matches all filters
            return matchesFilterOptions && matchesSearch && matchesCalories;
        });
    
        setFilteredRecipes(filtered);
    }, [recipename, searchTerm, selectedOption, calorieRange]);
    // Cuisine filter function
    const handleCuisineChange = (selectedOption) => {
        setSelectedOption(selectedOption); // Set the selected cuisine
    };
    const handleCalorieChange = (selectedRange) => {
        setCalorieRange(selectedRange); // Set the selected calorie range
        setCurrentPage(1); // Reset to page 1 when changing the filter
    };
    // Sample cuisine options for the dropdown
    const levelOptions = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Medium', label: 'Medium' },
    ];
    const MealType = [
        { value: 'Dinner', label: 'Dinner' },
        { value: 'Lunch', label: 'Lunch' },
        { value: 'Dessert', label: 'Dessert' },
        { value: 'Snack', label: 'Snack' },
        { value: 'Side Dish', label: 'Side Dish' },
        { value: 'Appetizer', label: 'Appetizer' },
        { value: 'Breakfast', label: 'Breakfast' },
        { value: 'Beverage', label: 'Beverage' },
    ];

    const Calories = [
        { value: '<150', label: '< 150' },
        { value: '<250', label: '< 250' },
        { value: '<350', label: '< 350' },
        { value: '>=350', label: '>= 350' }
        
    ];



    return (
        <div className='card-container'>
            <div className='filter-container'>
            <h3>Filter: </h3>
            {/* Dropdown for cuisine filtering */}
            <Select className='filter'
                options={[
                    { value: 'Italian', label: 'Italian' },
                    { value: 'Asian', label: 'Asian' },
                    { value: 'Mexican', label: 'Mexican' },
                    { value: 'Mediterranean', label: 'Mediterranean' },
                    { value: 'American', label: 'American' },
                    { value: 'Pakistani', label: 'Pakistani' },
                    { value: 'Japanese', label: 'Japanese' },
                    { value: 'Moroccan', label: 'Moroccan' },
                    { value: 'Korean', label: 'Korean' },
                    { value: 'Greek', label: 'Greek' },
                    { value: 'Thai', label: 'Thai' },
                    { value: 'Indian', label: 'Indian' },
                    { value: 'Turkish', label: 'Turkish' },
                    { value: 'Smoothie', label: 'Smoothie' },
                    { value: 'Russian', label: 'Russian' },
                    { value: 'Lebanese', label: 'Lebanese' },
                    { value: 'Brazilian', label: 'Brazilian' },
                    { value: 'Spanish', label: 'Spanish' },
                    { value: 'Vietnamese', label: 'Vietnamese' },
                    { value: 'Cocktail', label: 'Cocktail' },
                    { value: 'Hawaiian', label: 'Hawaiian' }
                    // Add more cuisines as needed
                ]}
                onChange={handleCuisineChange}
                isClearable // Allows clearing the filter
                placeholder="Select a cuisine..."
            />
            <Select className='filter'
                options={levelOptions}
                onChange={handleCuisineChange}
                isClearable // Allows clearing the filter
                placeholder="Select difficulty level..."
            />
            <Select className='filter'
                options={MealType}
                onChange={handleCuisineChange}
                isClearable // Allows clearing the filter
                placeholder="Select Meal Type.."
            />
            <Select className='filter'
                options={Calories}
                onChange={handleCalorieChange}
                isClearable // Allows clearing the filter
                placeholder="Calories..."
            />
            </div>
            <div className='cards'>
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => {
                        return (
                            <div className='card' key={recipe.id}>
                                <img src={recipe.image} alt={recipe.name} />
                                <div className='recipename'>
                                    <h2>{recipe.name}</h2>
                                    <button onClick={() => openRecipe(recipe.id)}>View Recipe</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h2>No recipes found matching your search or filter.</h2>
                )}
            </div>

            {/* Pagination Controls */}
            <div className='pagination'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    Next
                </button>
            </div>
        </div>
    );
}  