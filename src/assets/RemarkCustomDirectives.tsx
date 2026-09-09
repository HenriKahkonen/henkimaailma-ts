/* Custom directives that allow React markdown to process and parse input files that have special snippets like images with captions or embedded YouTube videos */

import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Plugin } from 'unified';
import type { Components } from 'react-markdown';

export const remarkCustomDirectives: Plugin<[], Root> = () => {
  return (tree, file) => {
      /*
      Ignore single colon instances, single colon isnt used as
      syntax for anything, but this way colons inside
      text (e.g. NASA:sta, klo 14:40...)
      get rendered as normal text inside <p> tags
      */
      visit(tree, 'textDirective', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const original = node.position
        ? file.value.slice(node.position.start.offset, node.position.end.offset)
        : `:${node.name}`;
      parent.children.splice(index, 1, { type: 'text', value: original });
    });
    
    visit(tree, (node: any) => {
      if (
        node.type !== 'containerDirective' &&
        node.type !== 'leafDirective'
      ) {
        return;
      }

      const data = node.data || (node.data = {});


      /* CUSTOM SNIPPET DEFINITIONS */
      /* Image with a description */
      if (node.name === 'image') {

        const url = node.children?.[0]?.url ?? '';

        data.hName = 'article-image';
        data.hProperties = { 
          imgSrc: url,
          caption: node.attributes?.caption ?? '' ,
        };
        return;
      }
      /* Embedded YouTube link */
      if (node.name === 'youtube') {

        const labelText = node.children?.[0]?.value ?? '';

        data.hName = 'youtube-embed';
        data.hProperties = {
          videoId: labelText,
          caption: node.attributes?.caption ?? '',
        };        
        return;
      }

      /* Unrecognized leaf or container directive name gets deleted instead of being rendered as an unstyled or broken snippet of text */ 
      data.hName = undefined;
    });
  };
};


/* Custom React Markdown components */

interface CustomComponents extends Components {
  'youtube-embed'?: React.ComponentType<{ 
    videoId?: string;
    caption?: string; 
  }>;
  'article-image'?: React.ComponentType<{ 
    imgSrc?: string;
    caption?: string; 
  }>;
}

export const customMarkdownComponents: CustomComponents = {
  'article-image': CaptionedImage,
  'youtube-embed': CaptionedYouTubeEmbed,
};


/////////////
/// IMAGE ///
/////////////

//
// To use the figure (image with description) in custom markdown, use syntax:
/*
::image[https://i.link.to.image.png]{caption="Your caption"}
*/

function CaptionedImage({ imgSrc, caption }: { imgSrc?: string; caption?: string}) {
  if (!imgSrc) return null;
  return (
    <figure className="article-figure">
      <img src={imgSrc} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

///////////////////
// YouTube Embed //
///////////////////

//
// To use a YouTube Embed, use syntax
/*
::youtube[dQw4w9WgXcQ]{caption="Your caption"}
*/


function CaptionedYouTubeEmbed({ videoId, caption }: { videoId?: string; caption?: string }) {
 
  if (!videoId) return null;
  return (
    <figure className="article-figure">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
  
}