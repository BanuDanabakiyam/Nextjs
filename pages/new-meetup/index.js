import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';
function NewMeetupPage(){
   const router = useRouter();
   async function addMeetupHandler(enteredMeetupData){
        const response = await fetch('/api/new-meetup',{
            method:'POST',
            body:JSON.stringify(enteredMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');


    }
     return(
        <Fragment>
            <Head>
            <title>Add a new Meetup</title>
            <meta name='description' content='Add your own meetup  and create amazing networking opportunities'/>
        </Head>
            <NewMeetupForm onAddMeetup = {addMeetupHandler}></NewMeetupForm></Fragment>
     ); 
}
export default NewMeetupPage;