import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MenuItem as MenuItemType } from "@/type"
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom"


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number
}

const DetailPage = ()=> {
    const {restaurantId} = useParams();
    const {restaurant, isLoading} = useGetRestaurant(restaurantId);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const addtoCart = (menuItem:MenuItemType)=> {
        setCartItems((prevCartItems)=>{
            const existingCartItem = prevCartItems.find((cartItem)=>cartItem._id === menuItem._id);
            let updatedCartItems;
            if(existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem)=>cartItem._id === menuItem._id ? {...cartItem, quantity: cartItem.quantity + 1}: cartItem)
            } else{
                updatedCartItems = [
                    ...prevCartItems, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            return updatedCartItems
        })
    }
    if(isLoading || !restaurant) {
        return "Loading...";
    }
    return (
        <div className="flex flex-col gap-10">
        <AspectRatio ratio = {16/5}>
            <img src ={restaurant.imageUrl}className="rounded-md object-cover h-full w-full"/>
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
            <div className="flex flex-col gap-4">
                <RestaurantInfo restaurant= {restaurant}/>
                <span className="text-2xl font-bold tracking-tight">Menu</span>
                {restaurant.menuItems.map((menuItem)=>(
                    <MenuItem key={menuItem._id} menuItem = {menuItem} addtoCart={()=>addtoCart(menuItem)}/>
                ))}
            </div>
            <div>
                <Card>
                    <OrderSummary restaurant = {restaurant} cartItems = {cartItems}/>
                </Card>
            </div>
        </div>
    </div>
    )
   
}
export default DetailPage