import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from '../redux/slices/authSlice';
import {
    selectTotalItems,
    selectTotalPrice,
  } from "../redux/slices/basketSlice";

import { View, Text, Image  } from "react-native";

import tailwind from "tailwind-react-native-classnames";

import Screen from "../components/Screen"

interface Order{
    customer: any;
    driver: any;
    order_details: any;
    address: ReactNode;
    status: ReactNode;
    total: ReactNode;
    restaurant: any;
    id?: number;

}

const OrderHistory = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);

      const [data, setData ]= useState<Order[]>([]);
    

      const orderHistory = async() => {
        let tokenvalue = user?.token;
    
        let response = await fetch('https://www.sunshinedeliver.com/api/customer/order/history/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                access_token: tokenvalue
              
              })
          })
           .then((response) => response.json())
           .then((responseJson) => {
    
            setData(responseJson?.order_history);
           
            })  
            .catch((error) => {
              console.error(error);
            });
    }
    
    useEffect(() =>{
     console.log("dta==>", data)
      orderHistory();
    
    }, []);
    




    return (
<>
       

<Screen style={tailwind``}>
             
            <View  style={tailwind`flex flex-col xl:flex-col justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8`} >
            {data.map((order) =>(

                        

                <View key={order?.id}  style={tailwind`flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full `} >
                   
                    <Text  style={tailwind`text-3xl xl:text-4xl font-semibold leading-7 xl:leading-9 w-full  md:text-left text-gray-800`} >Restaurant  {order?.restaurant?.name}</Text>
                    <Text  style={tailwind`text-base leading-none mt-4 text-gray-800`} >
                        Telefone <Text  style={tailwind`font-semibold`} > {order?.restaurant?.phone}</Text>
                    </Text>
                   
                    <View  style={tailwind`flex justify-center items-center w-full mt-8  flex-col space-y-4 `} >

                        <View  style={tailwind`flex-col justify-start items-start md:items-center  border border-gray-200 w-full`} >
                            <View  style={tailwind`w-40 md:w-32`} >
                                 <Image source={{ uri: order?.customer?.avatar}} style={tailwind`w-48 h-48 rounded-full`} />
                        
                            </View>
                            <View  style={tailwind`flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8`} >
                                <View  style={tailwind`flex flex-col md:flex-shrink-0  justify-start items-start`} >
                                    <Text  style={tailwind`text-lg md:text-xl  w-full font-semibold leading-6 md:leading-5  text-gray-800`} > Cliente : {order?.customer?.name}</Text>
                                    <View  style={tailwind`flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 `} >
                                        <Text  style={tailwind`text-sm leading-none text-gray-600`} >
                                            telefone: <Text  style={tailwind`text-gray-800`} > {order?.customer?.phone}</Text>
                                        </Text>
                                        <Text  style={tailwind`text-sm leading-none text-gray-600`} >
                                            Endereco: <Text  style={tailwind`text-gray-800`} > {order?.customer?.address}</Text>
                                        </Text>
                                    </View>
                                </View>
                               
                            </View>
                        </View>

                        <View  style={tailwind`flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full`} >
                            <View  style={tailwind`w-40 md:w-32 rounded-full`} >
                                <Image source={{ uri: order?.driver?.avatar}} style={tailwind`w-48 h-48 rounded-full`} />
                              
                               
                            </View>
                            <View  style={tailwind`flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8 `} >
                                <View  style={tailwind`flex flex-col md:flex-shrink-0  justify-start items-start`} >
                                    <Text  style={tailwind`text-lg md:text-xl font-semibold leading-6 md:leading-5  text-gray-800`} > Motorista : {order?.driver?.name}</Text>
                                    <View  style={tailwind`flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 `} >
                                        <Text  style={tailwind`text-sm leading-none text-gray-600`} >
                                            Telephone: <Text  style={tailwind`text-gray-800`} > {order?.driver?.phone}</Text>
                                        </Text>
                                        <Text  style={tailwind`text-sm leading-none text-gray-600`} >
                                            Endereco: <Text  style={tailwind`text-gray-800`} > {order?.driver?.address}</Text>
                                        </Text>
                                    </View>
                                </View>
                                
                            </View>
                        </View>
                        {order?.order_details.map((detais: { meal: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; sub_total: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; })=>(

                                    <View  style={tailwind`flex md:flex-row justify-start items-start md:items-center  border border-gray-200 w-full`} >
                                  
                                    <View  style={tailwind`flex justify-start md:justify-between items-start md:items-center  flex-col md:flex-row w-full p-4 md:px-8`} >
                                        <View  style={tailwind`flex flex-col md:flex-shrink-0  justify-start items-start`} >
                                            <Text  style={tailwind`text-lg md:text-xl  font-semibold leading-6 md:leading-5  text-gray-800`} >{detais.meal.name}</Text>
                                            <View  style={tailwind`flex flex-row justify-start  space-x-4 md:space-x-6 items-start mt-4 `} >
                                                <Text  style={tailwind`text-sm leading-none text-gray-600`} >
                                                    Preco: <Text  style={tailwind`text-gray-800`} >{detais.meal.price} Kz</Text>
                                                </Text>
                                                <Text>
                                                    Quantidade: <Text  style={tailwind`text-gray-800`} >{detais?.quantity}</Text>
                                                </Text>
                                            </View>
                                        </View>
                                        <View  style={tailwind`flex mt-4 md:mt-0 md:justify-end items-center w-full `} >
                                            <Text  style={tailwind`text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800`} >{detais?.sub_total} Kz</Text>
                                        </View>
                                    </View>
                                    </View>



                        ))}
                        
                    </View>


                    <View  style={tailwind`flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full`} >
                        <View  style={tailwind`flex justify-start items-start flex-col md:flex-row  w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8  lg:w-full`} >
                          
                            <View  style={tailwind`flex jusitfy-start items-start flex-col space-y-2`} >
                                <Text  style={tailwind`text-base font-semibold leading-4  text-gray-800`} >Endereço da Entrega</Text>
                                <Text  style={tailwind`text-sm leading-5 text-gray-600`} >{order.address}</Text>
                            </View>
                        
                        </View>
                        <View  style={tailwind`flex flex-col space-y-4 w-full`} >
                            <View  style={tailwind`flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4`} >
                               
                               
                                <View  style={tailwind`flex justify-between  w-full`} >
                                    <Text  style={tailwind`text-base leading-4 text-gray-800`} >status do pedido</Text>
                                    <Text>{order.status}</Text>
                                </View>
                            </View>
                            <View  style={tailwind`flex justify-between items-center w-full`} >
                                <Text  style={tailwind`text-base font-semibold leading-4 text-gray-800`} >Total</Text>
                                <Text  style={tailwind`text-base font-semibold leading-4 text-gray-600`} >{order.total} Kz</Text>
                            </View>
                        
                          
                        </View>
                    </View>
                </View>


))}
            </View>
        </Screen>
        </>
    );
};

export default OrderHistory;