import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tourPackages = [
    {
      name: 'Goa, India',
      img: 'https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?auto=format&fit=crop&w=400&q=80',
      duration: '5 Days / 4 Nights',
      details: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage.'
    },
    {
      name: 'Switzerland',
      img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80',
      duration: '7 Days / 6 Nights',
      details: 'Breathtaking alpine peaks, pristine lakes, and charming villages.'
    },
    {
      name: 'Maldives',
      img: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=400&q=80',
      duration: '6 Days / 5 Nights',
      details: 'Overwater bungalows, crystal-clear waters, and vibrant coral reefs.'
    },
    {
      name: 'Bali, Indonesia',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
      duration: '8 Days / 7 Nights',
      details: 'Lush rice paddies, spiritual temples, and world-class surfing.'
    },
    {
      name: 'Dubai, UAE',
      img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=400&q=80',
      duration: '4 Days / 3 Nights',
      details: 'Futuristic skyscrapers, luxury shopping, and desert adventures.'
    },
    {
      name: 'Rome, Italy',
      img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80',
      duration: '6 Days / 5 Nights',
      details: 'Ancient ruins, Renaissance art, and delicious Italian cuisine.'
    },
    {
      name: 'New York, USA',
      img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80',
      duration: '7 Days / 6 Nights',
      details: 'Iconic landmarks, bustling city life, and world-class entertainment.'
    },
    {
      name: 'Phuket, Thailand',
      img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?auto=format&fit=crop&w=400&q=80',
      duration: '5 Days / 4 Nights',
      details: 'Stunning beaches, vibrant markets, and exotic island hopping.'
    }
  ];

  testimonials = [
    {
      quote: 'An absolutely unforgettable experience! The planning was seamless, and every detail was taken care of. Highly recommend!',
      author: 'Jessica Miller',
      location: 'New York, USA',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    {
      quote: 'The best travel company I have ever used. Their customer support was fantastic, and the destinations were breathtaking.',
      author: 'David Chen',
      location: 'London, UK',
      img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100&q=80'
    },
    {
      quote: 'From booking to the final day of our trip, everything was perfect. The custom package was exactly what we wanted. Thank you!',
      author: 'Sophia Rodriguez',
      location: 'Sydney, Australia',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80'
    }
  ];
}
