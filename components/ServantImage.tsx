import Image from 'next/image';

interface ServantImageProps {
    imageUrl: string;
    alt: string;
}

const ServantImage = ({ imageUrl, alt }: ServantImageProps) => {
    return (
        <Image
            src={imageUrl}
            alt={alt}
            width={80}
            height={80}
        />
    );
};

export default ServantImage;