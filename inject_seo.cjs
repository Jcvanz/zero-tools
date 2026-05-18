const fs = require('fs');

// - seoTitle: aparece na aba do navegador e no resultado do Google (60 chars max)
// - seoDesc: aparece no snippet do Google (155 chars max), deve ter a intenção de busca
// - keywords: long-tail PT + EN + ES separadas por virgula

const seoData = {
  "background-remover": {
    "pt": {
      "seoTitle": "Remover Fundo de Imagem Grátis Online com IA — ZeroTools",
      "seoDesc": "Remova o fundo de qualquer foto com inteligência artificial. 100% gratuito, sem cadastro e sem instalar programas. Resultado em segundos com fundo transparente PNG.",
      "keywords": "remover fundo de imagem, tirar fundo de foto, remover fundo online gratis, fundo transparente png, remover fundo com ia, background remover, remove background free"
    },
    "en": {
      "seoTitle": "Remove Image Background Free Online with AI — ZeroTools",
      "seoDesc": "Remove the background from any photo using AI. 100% free, no sign up, no software install. Get transparent PNG results in seconds, directly in your browser.",
      "keywords": "remove image background free, background remover online, remove bg online, transparent background png, ai background remover, remove background without signup"
    },
    "es": {
      "seoTitle": "Eliminar Fondo de Imagen Gratis Online con IA — ZeroTools",
      "seoDesc": "Elimina el fondo de cualquier foto con inteligencia artificial. 100% gratis, sin registro y sin instalar programas. Resultado en segundos con fondo transparente PNG.",
      "keywords": "eliminar fondo de imagen, quitar fondo de foto gratis, remover fondo online, png transparente, eliminar fondo con ia, background remover gratis"
    }
  },
  "image-compressor": {
    "pt": {
      "seoTitle": "Compressor de Imagem Online Grátis — Reduzir Tamanho de Foto",
      "seoDesc": "Comprima imagens JPG, PNG e WebP sem perder qualidade. Reduza o tamanho do arquivo para e-mail e web. Gratuito, sem cadastro e 100% no seu navegador.",
      "keywords": "comprimir imagem online gratis, reduzir tamanho de foto, compressor de imagem, diminuir tamanho de imagem, compress image online, otimizar imagem para web"
    },
    "en": {
      "seoTitle": "Free Online Image Compressor — Reduce Photo Size Without Quality Loss",
      "seoDesc": "Compress JPG, PNG and WebP images without losing quality. Reduce file size for email and web. Free, no signup required, runs 100% in your browser.",
      "keywords": "compress image online free, reduce image file size, image compressor, shrink photo size, optimize image for web, compress png jpg free"
    },
    "es": {
      "seoTitle": "Compresor de Imágenes Online Gratis — Reducir Tamaño de Foto",
      "seoDesc": "Comprime imágenes JPG, PNG y WebP sin perder calidad. Reduce el tamaño del archivo para email y web. Gratis, sin registro y 100% en tu navegador.",
      "keywords": "comprimir imagen online gratis, reducir tamaño de foto, compresor de imágenes, disminuir tamaño imagen, optimizar imagen para web"
    }
  },
  "image-cropper": {
    "pt": {
      "seoTitle": "Cortar e Redimensionar Imagem Online Grátis — ZeroTools",
      "seoDesc": "Corte, redimensione e mude a proporção das suas fotos online. Suporta 1:1 Instagram, 16:9 YouTube, 9:16 TikTok e medidas personalizadas. Gratuito e sem cadastro.",
      "keywords": "cortar imagem online gratis, redimensionar foto, mudar proporção de imagem, crop image online, recortar foto, tamanho imagem instagram, redimensionar imagem pixels"
    },
    "en": {
      "seoTitle": "Crop & Resize Image Online Free — Custom Aspect Ratio — ZeroTools",
      "seoDesc": "Crop, resize, and change the aspect ratio of your photos online. Supports 1:1 Instagram, 16:9 YouTube, 9:16 TikTok and custom sizes. Free, no signup needed.",
      "keywords": "crop image online free, resize photo online, change image aspect ratio, image resizer, crop photo for instagram, resize image without quality loss"
    },
    "es": {
      "seoTitle": "Recortar y Redimensionar Imagen Online Gratis — ZeroTools",
      "seoDesc": "Recorta, redimensiona y cambia la proporción de tus fotos online. Compatible con 1:1 Instagram, 16:9 YouTube, 9:16 TikTok y tamaños personalizados. Gratis.",
      "keywords": "recortar imagen online gratis, redimensionar foto, cambiar proporción de imagen, crop image, recortar foto para instagram, redimensionar imagen pixeles"
    }
  },
  "qr-code": {
    "pt": {
      "seoTitle": "Gerador de QR Code Grátis Online — Criar QR Code para Link e WiFi",
      "seoDesc": "Crie QR Codes personalizados para URLs, textos e redes WiFi. Baixe em PNG ou SVG de alta qualidade. 100% gratuito, sem cadastro, direto no navegador.",
      "keywords": "gerador de qr code gratis, criar qr code online, qr code para link, qr code wifi, gerar qr code personalizado, qr code download png, criar qr code gratis"
    },
    "en": {
      "seoTitle": "Free QR Code Generator Online — Create QR Codes for URLs & WiFi",
      "seoDesc": "Create custom QR codes for URLs, text, and WiFi networks. Download as high-quality PNG or SVG. 100% free, no signup required, works directly in your browser.",
      "keywords": "free qr code generator, create qr code online, qr code for website, qr code wifi, custom qr code generator, qr code download png, make qr code free"
    },
    "es": {
      "seoTitle": "Generador de Código QR Gratis Online — Crear QR para Link y WiFi",
      "seoDesc": "Crea Códigos QR personalizados para URLs, textos y redes WiFi. Descarga en PNG o SVG de alta calidad. 100% gratis, sin registro, directo en el navegador.",
      "keywords": "generador de codigo qr gratis, crear codigo qr online, qr code para enlace, qr code wifi, generar qr personalizado, descargar qr png, crear qr gratis"
    }
  },
  "pdf-compressor": {
    "pt": {
      "seoTitle": "Comprimir PDF Online Grátis — Reduzir Tamanho de Arquivo PDF",
      "seoDesc": "Comprima arquivos PDF grandes sem perder qualidade para enviar por e-mail ou WhatsApp. Gratuito, sem cadastro, seus documentos não saem do seu computador.",
      "keywords": "comprimir pdf online gratis, reduzir tamanho pdf, diminuir pdf para enviar email, pdf menor gratis, compressor de pdf, comprimir pdf sem perder qualidade"
    },
    "en": {
      "seoTitle": "Compress PDF Online Free — Reduce PDF File Size Instantly",
      "seoDesc": "Compress large PDF files without quality loss to share by email or WhatsApp. Free, no signup, your documents never leave your computer.",
      "keywords": "compress pdf online free, reduce pdf file size, make pdf smaller, pdf compressor online, shrink pdf free, compress pdf without losing quality"
    },
    "es": {
      "seoTitle": "Comprimir PDF Online Gratis — Reducir Tamaño de Archivo PDF",
      "seoDesc": "Comprime archivos PDF grandes sin perder calidad para enviar por correo o WhatsApp. Gratis, sin registro, tus documentos no salen de tu computadora.",
      "keywords": "comprimir pdf online gratis, reducir tamaño pdf, hacer pdf mas pequeño, compresor de pdf, comprimir pdf sin perder calidad, pdf comprimido gratis"
    }
  },
  "password-generator": {
    "pt": {
      "seoTitle": "Gerador de Senha Forte e Segura Online Grátis — ZeroTools",
      "seoDesc": "Gere senhas aleatórias, fortes e seguras com letras, números e símbolos. Defina o tamanho ideal. 100% gratuito e privado — a senha não é salva em nenhum servidor.",
      "keywords": "gerador de senha forte, criar senha segura online, gerar senha aleatoria, senha com letras e numeros, password generator, gerador de senha gratis"
    },
    "en": {
      "seoTitle": "Strong Password Generator Online Free — Secure Random Passwords",
      "seoDesc": "Generate random, strong, and secure passwords with letters, numbers, and symbols. Set the ideal length. 100% free and private — passwords are never stored.",
      "keywords": "strong password generator, random password generator free, secure password online, generate password with symbols, password maker, create strong password"
    },
    "es": {
      "seoTitle": "Generador de Contraseñas Fuertes Online Gratis — ZeroTools",
      "seoDesc": "Genera contraseñas aleatorias, fuertes y seguras con letras, números y símbolos. Define el tamaño ideal. 100% gratis y privado — la contraseña no se guarda.",
      "keywords": "generador de contraseñas fuertes, crear contraseña segura online, generar contraseña aleatoria, password generator gratis, contraseña con simbolos"
    }
  },
  "hashtag-generator": {
    "pt": {
      "seoTitle": "Gerador de Hashtags para Instagram e TikTok Grátis — ZeroTools",
      "seoDesc": "Gere as melhores hashtags para Instagram, TikTok e Twitter por categoria. Copie todas de uma vez e aumente o alcance das suas publicações. Gratuito e online.",
      "keywords": "gerador de hashtags instagram gratis, hashtags para tiktok, melhores hashtags para instagram, hashtags por nicho, gerar hashtags online, hashtags para reels"
    },
    "en": {
      "seoTitle": "Hashtag Generator for Instagram & TikTok Free — ZeroTools",
      "seoDesc": "Generate the best hashtags for Instagram, TikTok, and Twitter by category. Copy them all at once and boost your post reach. Free online tool.",
      "keywords": "hashtag generator instagram free, tiktok hashtags, best hashtags for instagram, hashtags by niche, hashtag generator online, hashtags for reels"
    },
    "es": {
      "seoTitle": "Generador de Hashtags para Instagram y TikTok Gratis — ZeroTools",
      "seoDesc": "Genera los mejores hashtags para Instagram, TikTok y Twitter por categoría. Cópielos todos a la vez y aumenta el alcance de tus publicaciones. Gratis y online.",
      "keywords": "generador de hashtags instagram gratis, hashtags para tiktok, mejores hashtags para instagram, hashtags por nicho, generar hashtags online, hashtags para reels"
    }
  },
  "word-counter": {
    "pt": {
      "seoTitle": "Contador de Palavras e Caracteres Online Grátis — ZeroTools",
      "seoDesc": "Conte palavras, caracteres, frases e parágrafos em qualquer texto. Calcule o tempo de leitura e a densidade de palavras-chave para SEO. 100% gratuito e online.",
      "keywords": "contador de palavras online, contar caracteres online, contador de palavras gratis, quantas palavras tem meu texto, tempo de leitura, word counter online"
    },
    "en": {
      "seoTitle": "Free Online Word Counter & Character Counter — ZeroTools",
      "seoDesc": "Count words, characters, sentences, and paragraphs in any text. Calculate reading time and keyword density for SEO. 100% free, no signup, works offline.",
      "keywords": "word counter online free, character counter, count words in text, reading time calculator, word count tool, online word counter"
    },
    "es": {
      "seoTitle": "Contador de Palabras y Caracteres Online Gratis — ZeroTools",
      "seoDesc": "Cuenta palabras, caracteres, frases y párrafos en cualquier texto. Calcula el tiempo de lectura y densidad de palabras clave para SEO. 100% gratis y online.",
      "keywords": "contador de palabras online, contar caracteres online, contador de palabras gratis, cuantas palabras tiene mi texto, tiempo de lectura, word counter online"
    }
  },
  "json-formatter": {
    "pt": {
      "seoTitle": "Formatador e Validador de JSON Online Grátis — ZeroTools",
      "seoDesc": "Formate, valide e minifique JSON online. Destaque de sintaxe e detecção de erros em tempo real. Ferramenta essencial para desenvolvedores. Gratuita e sem cadastro.",
      "keywords": "formatador de json online, validador de json, json beautifier online, formatar json gratis, minificar json, json formatter online, validar json"
    },
    "en": {
      "seoTitle": "Free Online JSON Formatter & Validator — Beautify & Minify JSON",
      "seoDesc": "Format, validate and minify JSON online. Real-time syntax highlighting and error detection. Essential tool for developers. Free, no signup, works in your browser.",
      "keywords": "json formatter online free, json validator, json beautifier, format json online, minify json, json checker, beautify json free"
    },
    "es": {
      "seoTitle": "Formateador y Validador de JSON Online Gratis — ZeroTools",
      "seoDesc": "Formatea, valida y minifica JSON online. Resaltado de sintaxis y detección de errores en tiempo real. Herramienta esencial para desarrolladores. Gratis.",
      "keywords": "formateador de json online, validador de json, json beautifier online, formatear json gratis, minificar json, json formatter online, validar json"
    }
  },
  "base64": {
    "pt": {
      "seoTitle": "Codificador e Decodificador Base64 Online Grátis — ZeroTools",
      "seoDesc": "Codifique e decodifique strings Base64 e arquivos online. Suporta texto e imagens. Ferramenta rápida para desenvolvedores. 100% gratuita e sem cadastro.",
      "keywords": "codificador base64 online, decodificar base64, base64 encoder decoder online gratis, converter base64, encode base64 string, decode base64 text"
    },
    "en": {
      "seoTitle": "Free Base64 Encoder & Decoder Online — Encode & Decode Instantly",
      "seoDesc": "Encode and decode Base64 strings and files online. Supports text and images. Fast developer tool. 100% free, no signup, works directly in your browser.",
      "keywords": "base64 encoder decoder online free, encode base64, decode base64, base64 to text, text to base64, base64 converter, base64 online tool"
    },
    "es": {
      "seoTitle": "Codificador y Decodificador Base64 Online Gratis — ZeroTools",
      "seoDesc": "Codifica y decodifica cadenas Base64 y archivos online. Compatible con texto e imágenes. Herramienta rápida para desarrolladores. 100% gratis y sin registro.",
      "keywords": "codificador base64 online, decodificar base64, base64 encoder decoder gratis, convertir base64, encode base64 string, decode base64 text"
    }
  },
  "case-converter": {
    "pt": {
      "seoTitle": "Converter Texto para Maiúsculas e Minúsculas Online — ZeroTools",
      "seoDesc": "Converta textos para MAIÚSCULAS, minúsculas, Primeira Letra Maiúscula (Title Case) e mais. Gratuito, online e sem necessidade de cadastro.",
      "keywords": "converter texto maiusculo minusculo online, primeira letra maiuscula, title case online, case converter, converter texto online gratis, uppercase lowercase converter"
    },
    "en": {
      "seoTitle": "Text Case Converter Online Free — UPPERCASE, lowercase, Title Case",
      "seoDesc": "Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more. Free online tool, no signup required, works instantly in your browser.",
      "keywords": "text case converter online free, uppercase lowercase converter, title case online, camelcase converter, change text case, text transformer free"
    },
    "es": {
      "seoTitle": "Convertidor de Mayúsculas y Minúsculas Online Gratis — ZeroTools",
      "seoDesc": "Convierte textos a MAYÚSCULAS, minúsculas, Primera Letra Mayúscula (Title Case) y más. Gratis, online y sin necesidad de registro.",
      "keywords": "convertir texto mayusculas minusculas online, primera letra mayuscula, title case online, case converter, convertir texto online gratis, uppercase lowercase"
    }
  },
  "color-palette": {
    "pt": {
      "seoTitle": "Gerador de Paleta de Cores Online Grátis — HEX, RGB, HSL",
      "seoDesc": "Gere paletas de cores harmoniosas a partir de uma cor base. Exporte em HEX, RGB e HSL. Ideal para designers e desenvolvedores. 100% gratuito e online.",
      "keywords": "gerador de paleta de cores, paleta de cores online gratis, combinação de cores, color palette generator, paleta de cores hex, criar paleta de cores"
    },
    "en": {
      "seoTitle": "Free Color Palette Generator Online — HEX, RGB, HSL Colors",
      "seoDesc": "Generate beautiful color palettes from a base color. Export as HEX, RGB, and HSL. Perfect for designers and developers. 100% free online color tool.",
      "keywords": "color palette generator free, online color palette, color scheme generator, hex color picker, color combinations, create color palette online"
    },
    "es": {
      "seoTitle": "Generador de Paletas de Colores Online Gratis — HEX, RGB, HSL",
      "seoDesc": "Genera paletas de colores armoniosas a partir de un color base. Exporta en HEX, RGB y HSL. Ideal para diseñadores y desarrolladores. 100% gratis y online.",
      "keywords": "generador de paletas de colores, paleta de colores online gratis, combinacion de colores, color palette generator, colores hex, crear paleta de colores"
    }
  },
  "lorem-ipsum": {
    "pt": {
      "seoTitle": "Gerador de Lorem Ipsum Online Grátis — Texto de Exemplo — ZeroTools",
      "seoDesc": "Gere textos Lorem Ipsum (parágrafos, frases ou palavras) para mockups e projetos de design. Copie com um clique. 100% gratuito e sem cadastro.",
      "keywords": "gerador de lorem ipsum online, texto de exemplo para design, placeholder text, lorem ipsum gratis, gerar texto aleatorio, dummy text generator"
    },
    "en": {
      "seoTitle": "Free Lorem Ipsum Generator Online — Placeholder Text for Design",
      "seoDesc": "Generate Lorem Ipsum text (paragraphs, sentences, or words) for mockups and design projects. Copy with one click. 100% free, no signup required.",
      "keywords": "lorem ipsum generator online free, placeholder text generator, dummy text, random text generator, lorem ipsum paragraphs, design placeholder text"
    },
    "es": {
      "seoTitle": "Generador de Lorem Ipsum Online Gratis — Texto de Ejemplo — ZeroTools",
      "seoDesc": "Genera textos Lorem Ipsum (párrafos, frases o palabras) para maquetas y proyectos de diseño. Copia con un clic. 100% gratis y sin registro.",
      "keywords": "generador de lorem ipsum online, texto de ejemplo para diseño, placeholder text, lorem ipsum gratis, generar texto aleatorio, dummy text generator"
    }
  },
  "file-converter": {
    "pt": {
      "seoTitle": "Converter Imagem Online Grátis — JPG para PNG, WebP e mais",
      "seoDesc": "Converta imagens entre JPG, PNG, WebP e GIF instantaneamente no navegador. Sem upload para servidores. Gratuito e sem cadastro.",
      "keywords": "converter imagem online gratis, jpg para png, png para jpg, converter para webp, conversor de imagem, image converter online, mudar formato de imagem"
    },
    "en": {
      "seoTitle": "Free Image Converter Online — JPG to PNG, WebP & More",
      "seoDesc": "Convert images between JPG, PNG, WebP, and GIF formats instantly in your browser. No server uploads. Free, no signup required.",
      "keywords": "image converter online free, jpg to png converter, png to jpg, convert to webp, image format converter, change image format online"
    },
    "es": {
      "seoTitle": "Convertidor de Imágenes Online Gratis — JPG a PNG, WebP y más",
      "seoDesc": "Convierte imágenes entre JPG, PNG, WebP y GIF al instante en el navegador. Sin subir a servidores. Gratis y sin registro.",
      "keywords": "convertidor de imagenes online gratis, jpg a png, png a jpg, convertir a webp, conversor de imagenes, cambiar formato de imagen online"
    }
  }
};

['en', 'pt', 'es'].forEach(lang => {
  const file = `c:/Users/jvanz/projects-personal/micro-saas/src/locales/${lang}/translation.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  for (const [toolId, toolContent] of Object.entries(seoData)) {
    if (data.tools[toolId]) {
      const langData = toolContent[lang];
      data.tools[toolId].seoTitle = langData.seoTitle;
      data.tools[toolId].seoDesc  = langData.seoDesc;
      data.tools[toolId].keywords = langData.keywords;
    }
  }
  
  let content = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, content.slice(0, content.lastIndexOf('}') + 1) + '\n');
  console.log(`✅ ${lang} updated`);
});

console.log("Done!");
