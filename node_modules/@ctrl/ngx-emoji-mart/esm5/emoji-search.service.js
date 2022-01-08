import { __decorate, __values } from "tslib";
import { Injectable } from '@angular/core';
import { categories, EmojiData, EmojiService, } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { intersect } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "@ctrl/ngx-emoji-mart/ngx-emoji";
var EmojiSearch = /** @class */ (function () {
    function EmojiSearch(emojiService) {
        var e_1, _a;
        var _this = this;
        this.emojiService = emojiService;
        this.originalPool = {};
        this.index = {};
        this.emojisList = {};
        this.emoticonsList = {};
        this.emojiSearch = {};
        var _loop_1 = function (emojiData) {
            var shortNames = emojiData.shortNames, emoticons = emojiData.emoticons;
            var id = shortNames[0];
            emoticons.forEach(function (emoticon) {
                if (_this.emoticonsList[emoticon]) {
                    return;
                }
                _this.emoticonsList[emoticon] = id;
            });
            this_1.emojisList[id] = this_1.emojiService.getSanitizedData(id);
            this_1.originalPool[id] = emojiData;
        };
        var this_1 = this;
        try {
            for (var _b = __values(this.emojiService.emojis), _c = _b.next(); !_c.done; _c = _b.next()) {
                var emojiData = _c.value;
                _loop_1(emojiData);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    EmojiSearch.prototype.addCustomToPool = function (custom, pool) {
        var _this = this;
        custom.forEach(function (emoji) {
            var emojiId = emoji.id || emoji.shortNames[0];
            if (emojiId && !pool[emojiId]) {
                pool[emojiId] = _this.emojiService.getData(emoji);
                _this.emojisList[emojiId] = _this.emojiService.getSanitizedData(emoji);
            }
        });
    };
    EmojiSearch.prototype.search = function (value, emojisToShowFilter, maxResults, include, exclude, custom) {
        var _this = this;
        if (maxResults === void 0) { maxResults = 75; }
        if (include === void 0) { include = []; }
        if (exclude === void 0) { exclude = []; }
        if (custom === void 0) { custom = []; }
        this.addCustomToPool(custom, this.originalPool);
        var results;
        var pool = this.originalPool;
        if (value.length) {
            if (value === '-' || value === '-1') {
                return [this.emojisList['-1']];
            }
            if (value === '+' || value === '+1') {
                return [this.emojisList['+1']];
            }
            var values = value.toLowerCase().split(/[\s|,|\-|_]+/);
            var allResults = [];
            if (values.length > 2) {
                values = [values[0], values[1]];
            }
            if (include.length || exclude.length) {
                pool = {};
                categories.forEach(function (category) {
                    var isIncluded = include && include.length
                        ? include.indexOf(category.id) > -1
                        : true;
                    var isExcluded = exclude && exclude.length
                        ? exclude.indexOf(category.id) > -1
                        : false;
                    if (!isIncluded || isExcluded) {
                        return;
                    }
                    category.emojis.forEach(function (emojiId) {
                        // Need to make sure that pool gets keyed
                        // with the correct id, which is why we call emojiService.getData below
                        var emoji = _this.emojiService.getData(emojiId);
                        pool[emoji.id] = emoji;
                    });
                });
                if (custom.length) {
                    var customIsIncluded = include && include.length ? include.indexOf('custom') > -1 : true;
                    var customIsExcluded = exclude && exclude.length ? exclude.indexOf('custom') > -1 : false;
                    if (customIsIncluded && !customIsExcluded) {
                        this.addCustomToPool(custom, pool);
                    }
                }
            }
            allResults = values
                .map(function (v) {
                var aPool = pool;
                var aIndex = _this.index;
                var length = 0;
                var _loop_2 = function (charIndex) {
                    var e_2, _a;
                    var char = v[charIndex];
                    length++;
                    if (!aIndex[char]) {
                        aIndex[char] = {};
                    }
                    aIndex = aIndex[char];
                    if (!aIndex.results) {
                        var scores_1 = {};
                        aIndex.results = [];
                        aIndex.pool = {};
                        try {
                            for (var _b = (e_2 = void 0, __values(Object.keys(aPool))), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var id = _c.value;
                                var emoji = aPool[id];
                                if (!_this.emojiSearch[id]) {
                                    _this.emojiSearch[id] = _this.buildSearch(emoji.short_names, emoji.name, emoji.id, emoji.keywords, emoji.emoticons);
                                }
                                var query = _this.emojiSearch[id];
                                var sub = v.substr(0, length);
                                var subIndex = query.indexOf(sub);
                                if (subIndex !== -1) {
                                    var score = subIndex + 1;
                                    if (sub === id) {
                                        score = 0;
                                    }
                                    aIndex.results.push(_this.emojisList[id]);
                                    aIndex.pool[id] = emoji;
                                    scores_1[id] = score;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        aIndex.results.sort(function (a, b) {
                            var aScore = scores_1[a.id];
                            var bScore = scores_1[b.id];
                            return aScore - bScore;
                        });
                    }
                    aPool = aIndex.pool;
                };
                // tslint:disable-next-line: prefer-for-of
                for (var charIndex = 0; charIndex < v.length; charIndex++) {
                    _loop_2(charIndex);
                }
                return aIndex.results;
            })
                .filter(function (a) { return a; });
            if (allResults.length > 1) {
                results = intersect.apply(null, allResults);
            }
            else if (allResults.length) {
                results = allResults[0];
            }
            else {
                results = [];
            }
        }
        if (results) {
            if (emojisToShowFilter) {
                results = results.filter(function (result) {
                    if (result && result.id) {
                        return emojisToShowFilter(_this.emojiService.names[result.id]);
                    }
                    return false;
                });
            }
            if (results && results.length > maxResults) {
                results = results.slice(0, maxResults);
            }
        }
        return results || null;
    };
    EmojiSearch.prototype.buildSearch = function (shortNames, name, id, keywords, emoticons) {
        var search = [];
        var addToSearch = function (strings, split) {
            if (!strings) {
                return;
            }
            (Array.isArray(strings) ? strings : [strings]).forEach(function (str) {
                (split ? str.split(/[-|_|\s]+/) : [str]).forEach(function (s) {
                    s = s.toLowerCase();
                    if (!search.includes(s)) {
                        search.push(s);
                    }
                });
            });
        };
        addToSearch(shortNames, true);
        addToSearch(name, true);
        addToSearch(id, true);
        addToSearch(keywords, true);
        addToSearch(emoticons, false);
        return search.join(',');
    };
    EmojiSearch.ctorParameters = function () { return [
        { type: EmojiService }
    ]; };
    EmojiSearch.ɵprov = i0.ɵɵdefineInjectable({ factory: function EmojiSearch_Factory() { return new EmojiSearch(i0.ɵɵinject(i1.EmojiService)); }, token: EmojiSearch, providedIn: "root" });
    EmojiSearch = __decorate([
        Injectable({ providedIn: 'root' })
    ], EmojiSearch);
    return EmojiSearch;
}());
export { EmojiSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1vamktc2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtZW1vamktbWFydC8iLCJzb3VyY2VzIjpbImVtb2ppLXNlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGdDQUFnQyxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7OztBQUdwQztJQVdFLHFCQUFvQixZQUEwQjs7UUFBOUMsaUJBZ0JDO1FBaEJtQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQVY5QyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUN2QixVQUFLLEdBSUQsRUFBRSxDQUFDO1FBQ1AsZUFBVSxHQUFRLEVBQUUsQ0FBQztRQUNyQixrQkFBYSxHQUE4QixFQUFFLENBQUM7UUFDOUMsZ0JBQVcsR0FBOEIsRUFBRSxDQUFDO2dDQUcvQixTQUFTO1lBQ1YsSUFBQSxpQ0FBVSxFQUFFLCtCQUFTLENBQWU7WUFDNUMsSUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXpCLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO2dCQUN4QixJQUFJLEtBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ2hDLE9BQU87aUJBQ1I7Z0JBRUQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFLLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM3RCxPQUFLLFlBQVksQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUM7Ozs7WUFicEMsS0FBd0IsSUFB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QUNoRCxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVwQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDaEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4QixXQUFXLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RCLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsV0FBVyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU5QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7Z0JBeE5pQyxZQUFZOzs7SUFYbkMsV0FBVztRQUR2QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7T0FDdEIsV0FBVyxDQW9PdkI7c0JBOU9EO0NBOE9DLEFBcE9ELElBb09DO1NBcE9ZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIGNhdGVnb3JpZXMsXG4gIEVtb2ppRGF0YSxcbiAgRW1vamlTZXJ2aWNlLFxufSBmcm9tICdAY3RybC9uZ3gtZW1vamktbWFydC9uZ3gtZW1vamknO1xuaW1wb3J0IHsgaW50ZXJzZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRW1vamlTZWFyY2gge1xuICBvcmlnaW5hbFBvb2w6IGFueSA9IHt9O1xuICBpbmRleDoge1xuICAgIHJlc3VsdHM/OiBFbW9qaURhdGFbXTtcbiAgICBwb29sPzogeyBba2V5OiBzdHJpbmddOiBFbW9qaURhdGEgfTtcbiAgICBba2V5OiBzdHJpbmddOiBhbnk7XG4gIH0gPSB7fTtcbiAgZW1vamlzTGlzdDogYW55ID0ge307XG4gIGVtb3RpY29uc0xpc3Q6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgZW1vamlTZWFyY2g6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVtb2ppU2VydmljZTogRW1vamlTZXJ2aWNlKSB7XG4gICAgZm9yIChjb25zdCBlbW9qaURhdGEgb2YgdGhpcy5lbW9qaVNlcnZpY2UuZW1vamlzKSB7XG4gICAgICBjb25zdCB7IHNob3J0TmFtZXMsIGVtb3RpY29ucyB9ID0gZW1vamlEYXRhO1xuICAgICAgY29uc3QgaWQgPSBzaG9ydE5hbWVzWzBdO1xuXG4gICAgICBlbW90aWNvbnMuZm9yRWFjaChlbW90aWNvbiA9PiB7XG4gICAgICAgIGlmICh0aGlzLmVtb3RpY29uc0xpc3RbZW1vdGljb25dKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbW90aWNvbnNMaXN0W2Vtb3RpY29uXSA9IGlkO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZW1vamlzTGlzdFtpZF0gPSB0aGlzLmVtb2ppU2VydmljZS5nZXRTYW5pdGl6ZWREYXRhKGlkKTtcbiAgICAgIHRoaXMub3JpZ2luYWxQb29sW2lkXSA9IGVtb2ppRGF0YTtcbiAgICB9XG4gIH1cblxuICBhZGRDdXN0b21Ub1Bvb2woY3VzdG9tOiBhbnksIHBvb2w6IGFueSkge1xuICAgIGN1c3RvbS5mb3JFYWNoKChlbW9qaTogYW55KSA9PiB7XG4gICAgICBjb25zdCBlbW9qaUlkID0gZW1vamkuaWQgfHwgZW1vamkuc2hvcnROYW1lc1swXTtcblxuICAgICAgaWYgKGVtb2ppSWQgJiYgIXBvb2xbZW1vamlJZF0pIHtcbiAgICAgICAgcG9vbFtlbW9qaUlkXSA9IHRoaXMuZW1vamlTZXJ2aWNlLmdldERhdGEoZW1vamkpO1xuICAgICAgICB0aGlzLmVtb2ppc0xpc3RbZW1vamlJZF0gPSB0aGlzLmVtb2ppU2VydmljZS5nZXRTYW5pdGl6ZWREYXRhKGVtb2ppKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNlYXJjaChcbiAgICB2YWx1ZTogc3RyaW5nLFxuICAgIGVtb2ppc1RvU2hvd0ZpbHRlcj86ICh4OiBhbnkpID0+IGJvb2xlYW4sXG4gICAgbWF4UmVzdWx0cyA9IDc1LFxuICAgIGluY2x1ZGU6IGFueVtdID0gW10sXG4gICAgZXhjbHVkZTogYW55W10gPSBbXSxcbiAgICBjdXN0b206IGFueVtdID0gW10sXG4gICk6IEVtb2ppRGF0YVtdIHwgbnVsbCB7XG4gICAgdGhpcy5hZGRDdXN0b21Ub1Bvb2woY3VzdG9tLCB0aGlzLm9yaWdpbmFsUG9vbCk7XG5cbiAgICBsZXQgcmVzdWx0czogRW1vamlEYXRhW10gfCB1bmRlZmluZWQ7XG4gICAgbGV0IHBvb2wgPSB0aGlzLm9yaWdpbmFsUG9vbDtcblxuICAgIGlmICh2YWx1ZS5sZW5ndGgpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJy0nIHx8IHZhbHVlID09PSAnLTEnKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5lbW9qaXNMaXN0WyctMSddXTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSA9PT0gJysnIHx8IHZhbHVlID09PSAnKzEnKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5lbW9qaXNMaXN0WycrMSddXTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlcyA9IHZhbHVlLnRvTG93ZXJDYXNlKCkuc3BsaXQoL1tcXHN8LHxcXC18X10rLyk7XG4gICAgICBsZXQgYWxsUmVzdWx0cyA9IFtdO1xuXG4gICAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgdmFsdWVzID0gW3ZhbHVlc1swXSwgdmFsdWVzWzFdXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluY2x1ZGUubGVuZ3RoIHx8IGV4Y2x1ZGUubGVuZ3RoKSB7XG4gICAgICAgIHBvb2wgPSB7fTtcblxuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzSW5jbHVkZWQgPVxuICAgICAgICAgICAgaW5jbHVkZSAmJiBpbmNsdWRlLmxlbmd0aFxuICAgICAgICAgICAgICA/IGluY2x1ZGUuaW5kZXhPZihjYXRlZ29yeS5pZCkgPiAtMVxuICAgICAgICAgICAgICA6IHRydWU7XG4gICAgICAgICAgY29uc3QgaXNFeGNsdWRlZCA9XG4gICAgICAgICAgICBleGNsdWRlICYmIGV4Y2x1ZGUubGVuZ3RoXG4gICAgICAgICAgICAgID8gZXhjbHVkZS5pbmRleE9mKGNhdGVnb3J5LmlkKSA+IC0xXG4gICAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgICAgaWYgKCFpc0luY2x1ZGVkIHx8IGlzRXhjbHVkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXRlZ29yeS5lbW9qaXMuZm9yRWFjaChcbiAgICAgICAgICAgIGVtb2ppSWQgPT4ge1xuICAgICAgICAgICAgICAvLyBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHBvb2wgZ2V0cyBrZXllZFxuICAgICAgICAgICAgICAvLyB3aXRoIHRoZSBjb3JyZWN0IGlkLCB3aGljaCBpcyB3aHkgd2UgY2FsbCBlbW9qaVNlcnZpY2UuZ2V0RGF0YSBiZWxvd1xuICAgICAgICAgICAgICBjb25zdCBlbW9qaSA9IHRoaXMuZW1vamlTZXJ2aWNlLmdldERhdGEoZW1vamlJZCk7XG4gICAgICAgICAgICAgIHBvb2xbZW1vamkuaWRdID0gZW1vamk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGN1c3RvbS5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBjdXN0b21Jc0luY2x1ZGVkID1cbiAgICAgICAgICAgIGluY2x1ZGUgJiYgaW5jbHVkZS5sZW5ndGggPyBpbmNsdWRlLmluZGV4T2YoJ2N1c3RvbScpID4gLTEgOiB0cnVlO1xuICAgICAgICAgIGNvbnN0IGN1c3RvbUlzRXhjbHVkZWQgPVxuICAgICAgICAgICAgZXhjbHVkZSAmJiBleGNsdWRlLmxlbmd0aCA/IGV4Y2x1ZGUuaW5kZXhPZignY3VzdG9tJykgPiAtMSA6IGZhbHNlO1xuICAgICAgICAgIGlmIChjdXN0b21Jc0luY2x1ZGVkICYmICFjdXN0b21Jc0V4Y2x1ZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZEN1c3RvbVRvUG9vbChjdXN0b20sIHBvb2wpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhbGxSZXN1bHRzID0gdmFsdWVzXG4gICAgICAgIC5tYXAodiA9PiB7XG4gICAgICAgICAgbGV0IGFQb29sID0gcG9vbDtcbiAgICAgICAgICBsZXQgYUluZGV4ID0gdGhpcy5pbmRleDtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gMDtcblxuICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogcHJlZmVyLWZvci1vZlxuICAgICAgICAgIGZvciAobGV0IGNoYXJJbmRleCA9IDA7IGNoYXJJbmRleCA8IHYubGVuZ3RoOyBjaGFySW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgY2hhciA9IHZbY2hhckluZGV4XTtcbiAgICAgICAgICAgIGxlbmd0aCsrO1xuICAgICAgICAgICAgaWYgKCFhSW5kZXhbY2hhcl0pIHtcbiAgICAgICAgICAgICAgYUluZGV4W2NoYXJdID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhSW5kZXggPSBhSW5kZXhbY2hhcl07XG5cbiAgICAgICAgICAgIGlmICghYUluZGV4LnJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2NvcmVzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XG5cbiAgICAgICAgICAgICAgYUluZGV4LnJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgYUluZGV4LnBvb2wgPSB7fTtcblxuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIE9iamVjdC5rZXlzKGFQb29sKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVtb2ppID0gYVBvb2xbaWRdO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbW9qaVNlYXJjaFtpZF0pIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW1vamlTZWFyY2hbaWRdID0gdGhpcy5idWlsZFNlYXJjaChcbiAgICAgICAgICAgICAgICAgICAgZW1vamkuc2hvcnRfbmFtZXMsXG4gICAgICAgICAgICAgICAgICAgIGVtb2ppLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGVtb2ppLmlkLFxuICAgICAgICAgICAgICAgICAgICBlbW9qaS5rZXl3b3JkcyxcbiAgICAgICAgICAgICAgICAgICAgZW1vamkuZW1vdGljb25zXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMuZW1vamlTZWFyY2hbaWRdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YiA9IHYuc3Vic3RyKDAsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5kZXggPSBxdWVyeS5pbmRleE9mKHN1Yik7XG5cbiAgICAgICAgICAgICAgICBpZiAoc3ViSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBzdWJJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgICBpZiAoc3ViID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGFJbmRleC5yZXN1bHRzLnB1c2godGhpcy5lbW9qaXNMaXN0W2lkXSk7XG4gICAgICAgICAgICAgICAgICBhSW5kZXgucG9vbFtpZF0gPSBlbW9qaTtcblxuICAgICAgICAgICAgICAgICAgc2NvcmVzW2lkXSA9IHNjb3JlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGFJbmRleC5yZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhU2NvcmUgPSBzY29yZXNbYS5pZF07XG4gICAgICAgICAgICAgICAgY29uc3QgYlNjb3JlID0gc2NvcmVzW2IuaWRdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFTY29yZSAtIGJTY29yZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFQb29sID0gYUluZGV4LnBvb2w7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGFJbmRleC5yZXN1bHRzO1xuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKGEgPT4gYSk7XG5cbiAgICAgIGlmIChhbGxSZXN1bHRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmVzdWx0cyA9IGludGVyc2VjdC5hcHBseShudWxsLCBhbGxSZXN1bHRzIGFzIGFueSk7XG4gICAgICB9IGVsc2UgaWYgKGFsbFJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdHMgPSBhbGxSZXN1bHRzWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICBpZiAoZW1vamlzVG9TaG93RmlsdGVyKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLmZpbHRlcigocmVzdWx0OiBFbW9qaURhdGEpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdC5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtb2ppc1RvU2hvd0ZpbHRlcih0aGlzLmVtb2ppU2VydmljZS5uYW1lc1tyZXN1bHQuaWRdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdHMgJiYgcmVzdWx0cy5sZW5ndGggPiBtYXhSZXN1bHRzKSB7XG4gICAgICAgIHJlc3VsdHMgPSByZXN1bHRzLnNsaWNlKDAsIG1heFJlc3VsdHMpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cyB8fCBudWxsO1xuICB9XG5cbiAgYnVpbGRTZWFyY2goXG4gICAgc2hvcnROYW1lczogc3RyaW5nW10sXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGlkOiBzdHJpbmcsXG4gICAga2V5d29yZHM6IHN0cmluZ1tdLFxuICAgIGVtb3RpY29uczogc3RyaW5nW10sXG4gICkge1xuICAgIGNvbnN0IHNlYXJjaDogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0IGFkZFRvU2VhcmNoID0gKHN0cmluZ3M6IHN0cmluZyB8IHN0cmluZ1tdLCBzcGxpdDogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKCFzdHJpbmdzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgKEFycmF5LmlzQXJyYXkoc3RyaW5ncykgPyBzdHJpbmdzIDogW3N0cmluZ3NdKS5mb3JFYWNoKHN0ciA9PiB7XG4gICAgICAgIChzcGxpdCA/IHN0ci5zcGxpdCgvWy18X3xcXHNdKy8pIDogW3N0cl0pLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgcyA9IHMudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgIGlmICghc2VhcmNoLmluY2x1ZGVzKHMpKSB7XG4gICAgICAgICAgICBzZWFyY2gucHVzaChzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFkZFRvU2VhcmNoKHNob3J0TmFtZXMsIHRydWUpO1xuICAgIGFkZFRvU2VhcmNoKG5hbWUsIHRydWUpO1xuICAgIGFkZFRvU2VhcmNoKGlkLCB0cnVlKTtcbiAgICBhZGRUb1NlYXJjaChrZXl3b3JkcywgdHJ1ZSk7XG4gICAgYWRkVG9TZWFyY2goZW1vdGljb25zLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gc2VhcmNoLmpvaW4oJywnKTtcbiAgfVxufVxuIl19