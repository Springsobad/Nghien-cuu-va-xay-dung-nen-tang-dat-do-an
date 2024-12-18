import { OrderStatus } from "@/type";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number
}

export const ORDER_STATUS: OrderStatusInfo[] = [
    {label: "Placed", value: "placed", progressValue: 0},
    {label: "Awaiting Restaurant Confirm", value: "paid", progressValue: 25},
    {label: "InProgress", value: "inProgress", progressValue: 50},
    {label: "Out for Delivery", value: "outForDelivery", progressValue: 75},
    {label: "Delivered", value: "delivered", progressValue: 100},
    
]