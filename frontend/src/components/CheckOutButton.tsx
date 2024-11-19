import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
    onCheckout: (userFormData:UserFormData) =>void;
    disabled:boolean;
}
const CheckOutButton = ({onCheckout, disabled}: Props) => {
    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();
    const {currentUser, isLoading: isGetUserLoading} = useGetMyUser();
    const onLogin = async() => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }
    if(isAuthLoading || !currentUser) {
        return <LoadingButton/>
    }
    if(!isAuthenticated) {
        return <Button onClick = {onLogin} className="bg-orange-500 flex-1">
            Log in to check out
        </Button>
    }
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled = {disabled}className="bg-orange-500 flex-1">
                    Go to Check out
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-500">
                <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} title="Confirm Delivery Detail" buttonText="Continue to payment"/>
            </DialogContent>
           
        </Dialog>
    )
   
}
export default CheckOutButton;