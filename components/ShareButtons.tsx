import React from 'react';
import Button from './Button';

interface ShareButtonsProps {
  text: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ text, url }) => {
  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareFacebook = () => {
    // Facebook sharer uses 'u' for URL and 'quote' for pre-filled text
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      alert('Palavra do Dharma copiada para a área de transferência!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Falha ao copiar. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <Button onClick={handleShareWhatsApp} color="emerald" className="min-w-[120px] md:min-w-[150px]">
        WhatsApp
      </Button>
      <Button onClick={handleShareFacebook} color="blue" className="min-w-[120px] md:min-w-[150px]">
        Facebook
      </Button>
      <Button onClick={handleShareTwitter} color="indigo" className="min-w-[120px] md:min-w-[150px]">
        Twitter
      </Button>
      <Button onClick={handleCopyLink} color="purple" className="min-w-[120px] md:min-w-[150px]">
        Copiar Link
      </Button>
    </div>
  );
};

export default ShareButtons;