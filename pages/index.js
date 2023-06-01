//import { useEffect,useState } from 'react';
import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
//nextjs (mongoclient)identified its not show on client side its execute in server side for data security
import MeetupList from '../components/meetups/MeetupList';


function HomePage(props){
    // const [loadedMeetup,setLoadedMeetup] = useState();
    // useEffect(() => {
    //     //send a http request and fetch data
    //     setLoadedMeetup(DUMMY_MEETUPS);
    // },[]);
    
    return (
        <Fragment>
        <Head>
            <title>React Meetup</title>
            <meta name='description' content='Browse a huge list of highly active React meetup'/>
        </Head>
        <MeetupList meetups = {props.meetups} ></MeetupList>);
        </Fragment>);
}
// export async function getServerSideprops(context){
//     const req = context.req;
//     const res = context.res;
//     return{
//         props:{
//             meetups:DUMMY_MEETUPS,
//         }
//     }
// }
export async function getStaticProps(){
    //fetch data from api
    //fetch('/api/meetups');//instead of import MONGODBCLIENT
        const client = await MongoClient.connect('mongodb+srv://Banu:mongodb@cluster0.9sbpsqn.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');

        const meetups = await meetupCollection.find().toArray();
        client.close();



    return{
        props:{
            meetups:meetups.map(meetup => ({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                id:meetup._id.toString(),
            })),
        },
        revalidate:1
    }
}
export default HomePage;