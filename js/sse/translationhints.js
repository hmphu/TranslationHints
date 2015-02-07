document.observe('dom:loaded',
    function() {
        var walker = document.createTreeWalker(
            document.body, 
            NodeFilter.SHOW_TEXT, 
            null, 
            false
        );
        var decorateTranslationHints = function(textNode) {
            var newText =  textNode.nodeValue.replace(/\[__(.*?)__\]\(\(__\((.*?)\):(.*?)(?:__\((.*?)\):(.*?))?(\(cached\))?\)\)/g,
                function(match, translated, code, codeSources, text, textSources, cached) {
                    var result = translated + ' <span class="translation-hint-icon">i</span>';
                    result += '<span class="translation-hint-popup">';
                    result += '<b>'+ code +':</b><br/>';
                    result += codeSources
                        .replace(/\|/g, '<br/>')
                        .replace(/\(x\)/g, '<span class="translation-hint-check">&#x2714;</span>');
                    if (text) {
                        result += '<b>'+ text +':</b><br/>';
                        result += textSources
                            .replace(/\|/g, '<br/>')
                            .replace(/\(x\)/g, '<span class="translation-hint-check">&#x2714;</span>');
                    }
                    if (cached) {
                        result += cached;
                    }
                    result += '</span>';
                    return result;
                }
            );
            if (newText == textNode.nodeValue) {
                return null;
            }
            var tmpElement = document.createElement('span');
            tmpElement.innerHTML = newText;
            return tmpElement.childNodes;
        }

        var node;
        var nodesToRemove = [];

        while (node = walker.nextNode()) {
            try {
                var newNodes = decorateTranslationHints(node);
                
                if (newNodes == null) {
                    continue;
                }
                var newNode;
                while (newNode = newNodes[0]) {
                    node.parentNode.insertBefore(newNodes[0], node);
                }
                nodesToRemove.push(node);
            } catch (e) {
                console.log(e); 
            }
        }
        for (var i = 0; i < nodesToRemove.length; ++i) {
            nodesToRemove[i].parentNode.removeChild(nodesToRemove[i]);
        }

    }
);