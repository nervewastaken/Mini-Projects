"use client"
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import db from "./firebase"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Star from "@/components/star";
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [recommend, setRecommend] = useState(null);
  const [user,setUser] = useState("");
  const [email,setEmail] = useState("");
  const [text,setText] = useState("");
  const [praise, setPraise] = useState({
    adventurous: false,
    clean: false,
    goodListener: false,
  });
  const [hoverRating, setHoverRating] = useState(0); 
  const [hoverRating2, setHoverRating2] = useState(0); 
  const currdate = new Date();

  const handledata = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "reviews"), {
        user: user,
        email: email,
        safetyReview: rating,
        commReview: rating2,
        recommend: recommend,
        praise: praise,
        opinion: text,
        date: currdate
      });
      console.log("Document written with ID: ", docRef.id);
  
      // Reset form values
      setUser("");
      setEmail("");
      setRating(0);
      setRating2(0);
      setRecommend(null);
      setPraise({
        adventurous: false,
        clean: false,
        goodListener: false,
      });
      setText("");

      alert("Thank You for Filling the form!")
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("error please try again")
      // Reset form values
      setUser("");
      setEmail("");
      setRating(0);
      setRating2(0);
      setRecommend(null);
      setPraise({
        adventurous: false,
        clean: false,
        goodListener: false,
      });
      setText("");
    }
  };
  const togglePraise = (type) => {
    setPraise(prevState => ({
      ...prevState,
      [type]: !prevState[type]
    }));
  };

  return (
    <main className="flex w-full p-4 justify-center items-center">
      <Card className="cardclass">
        <CardHeader className='text-xl'>
          Leave a review
        </CardHeader>
        <CardContent>
          <form onSubmit={handledata}>
            <div className='py-3'>
            <Label className='text-xl'>Name</Label>
            <Input type="text" placeholder="Enter your name" value={user} onChange={(e) => setUser(e.target.value)}/>
            </div>

            <div>
            <Label className='text-xl'>Email</Label>
            <Input type="email" placeholder="abc@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='py-3'>
            <Label className="text-xl py-3">Safety</Label>
            <p>How would you rate our product on safety?</p>
            <div className="flex justify-center mb-4 py-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                key={num}
                type="button"
                onMouseEnter={() => setHoverRating(num)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(num)}
                className={`mx-1 ${num <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-400'}`}
            >
                <Star />
            </button>
              ))}
            </div>
            </div>
            <div>
            <Label className='text-xl'>Communication</Label>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex justify-center mb-4 py-2">
              {[1, 2, 3, 4, 5].map((num2) => (
                <button
                key={num2}
                type="button"
                onMouseEnter={() => setHoverRating2(num2)}
                onMouseLeave={() => setHoverRating2(0)}
                onClick={() => setRating2(num2)}
                className={`mx-1 ${num2 <= (hoverRating2 || rating2) ? 'text-yellow-500' : 'text-gray-400'}`}
            >
                <Star />
            </button>
              ))}
            </div>
            </div>

            <Label className="text-xl">Would you recommend Trausti?</Label>
            <div className="flex justify-center mb-4">
              <button
                type='button'
                className={`mx-2 py-2 ${recommend === 'yes' ? 'text-green-500' : 'text-gray-400'} hover:text-green-300`}
                onClick={() => setRecommend('yes')}
              >
                <ThumbsUp />
              </button>
              <button
                type='button'
                className={`mx-2 py-2 ${recommend === 'no' ? 'text-green-500' : 'text-gray-400'} hover:text-green-300`}
                onClick={() => setRecommend('no')}
              >
                <ThumbsDown />
              </button>
            </div>
            
            <Label className='text-xl'>Praise</Label>
            <p>What makes us good?</p>
            <div className="flex justify-center ">
              {['adventurous', 'clean', 'goodListener'].map((praiseType) => (
                <button
                key={praiseType}
                type="button"
                onClick={() => togglePraise(praiseType)}
                className={`mx-1 py-2 border rounded praiseButton ${praise[praiseType] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-green-300 hover:text-white`}>
                {praiseType.charAt(0).toUpperCase() + praiseType.slice(1)}
              </button>
              
              ))}
            </div>
            <div className='py-4'>
              <Label>Anything else?</Label>
              <Textarea value={text} onChange= {(e) => setText(e.target.value)}></Textarea>

            </div>
            

            <Button type="submit">Post Review</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
