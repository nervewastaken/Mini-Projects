package main

import (
	"fmt"
	"errors"
)

//statically typed language so type casting has to be done manually OR implied
//variables after declaration HAVE to be used or an error will raise
//strong type language which does NOT allow variables of different data types to have operations together
// eg -> 1+ "no" will work in JAVASCRIPT but not in GO


func main()  {
	fmt.Println("hello world!") //print 

	var intNum = 56 //inferred declaration
	fmt.Print(intNum)

	var bit8 int8 = 127 //8 bit number | manual declaration
	fmt.Print(bit8)
	//options are int8, int16, int32 or int64 

	var floatNum float32 = 10.1
	fmt.Print(floatNum)
	// float32 or float64 
	// IEEE floating point standard 
	// 64 has more accuracy but more storage 

	var res = float32(bit8) + floatNum
	fmt.Print(res)
	//int + float is not possible 
	//need to typecast

	var int1 = 3
	var int2 = 2 
	fmt.Println(int1/int2)
	//rounds DOWN

	var mystr string = "hello" + " " + "World"
	fmt.Println(mystr)
	fmt.Println(len(mystr))
	//len(stringvar) will return no of bytes which may break if characters outside of 256 bit ASCII is used 

	var myBool bool = false 
	fmt.Println(myBool)

	//DEFAULT VALUES FOR 
	//uint8/16/32/64 , int8/16/32/64, float32/64,rune is 0 
	//string is ""
	//bool is false 

	myVar := "text" //no need to use var here with this 
	fmt.Print(myVar)

	const myConst string = "const value"
	//same as javascript const, needs to be declared, can't be changed once set

	newfunction()
	div(8,3)
	var result,rem, err = diverr(100,0)
	if err!=nil{
		fmt.Println(err.Error())
	}else{
		fmt.Printf("The result is %v with remainder %v", result, rem)
	}
	
}
	func newfunction(){
		fmt.Println("hello world from newfunction")
	}

	func div(num int, denum int) (int,int) {  //first brackets are params, second are return types
		var result int = num/denum
		var rem int = num%denum
		return result,rem
	}

	//error handling

	func diverr(num int, denum int) (int,int,error) {  //first brackets are params, second are return types
		var err error
		if denum ==0{
			err = errors.New("cannot divide by zero")
			return 0,0, err
		}
		var result int = num/denum
		var rem int = num%denum
		return result,rem,err
	}








