'use client'

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const testimonials = [
    {
      name: 'Jose',
      avatar: 'J',
      title: 'Software Engineer',
      description: 'This is the best application I have used',
    },
    {
      name: 'Maria',
      avatar: 'M',
      title: 'UX Designer',
      description: 'Amazing user experience and intuitive design.',
    },
    {
      name: 'Carlos',
      avatar: 'C',
      title: 'Product Manager',
      description: 'Highly recommended for efficient project management.',
    },
    {
      name: 'Ana',
      avatar: 'A',
      title: 'Marketing Specialist',
      description: 'Helped me reach my target audience effectively.',
    },
    {
      name: 'Luisa',
      avatar: 'L',
      title: 'Content Creator',
      description: 'A valuable tool for content planning and creation.',
    },
    {
      name: 'Pedro',
      avatar: 'P',
      title: 'Data Scientist',
      description: 'Enabled me to extract valuable insights from data.',
    },
  ];

const LandingContent = () => {
    return (
        <div className='px-10 pb-20'>
            <h2 className='text-center text-4xl text-white font-extrabold mb-10'>
                Testimonials
            </h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {testimonials.map(testimonial => (
                    <Card
                        key={testimonial.description}
                        className='bg-[#192339] border-none text-white'
                    >
                        <CardHeader>
                            <CardTitle className='flex items-center gap-x-2'>
                                <div>
                                    <p className='text-lg'>
                                        {testimonial.name}
                                    </p>
                                    <p className='text-zinc-400 text-sm'>
                                        {testimonial.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className='pt-4 px-0'>
                                {testimonial.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default LandingContent;