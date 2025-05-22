import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Clock, X, Star } from "lucide-react";
import products from "@/data/products-data";
import Image from "next/image";
import Link from "next/link";
import { getCurrencySymbol } from "@/lib/formats";
import { averageRating } from "@/lib/review";

const SEARCH_HISTORY_KEY = "search_history";
const MAX_HISTORY_ITEMS = 5;

interface SearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchModal = ({ isOpen, onOpenChange }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const saveToHistory = (query: string) => {
    if (!query.trim()) return;

    const newHistory = [
      query,
      ...searchHistory.filter((item) => item !== query),
    ].slice(0, MAX_HISTORY_ITEMS);

    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  const removeHistoryItem = (query: string) => {
    const newHistory = searchHistory.filter((item) => item !== query);
    setSearchHistory(newHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    saveToHistory(query);
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(searchQuery ? filtered : []);
  }, [searchQuery]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            className="w-full border-0 focus-visible:ring-0 pl-12 pr-4 py-6 text-lg"
            placeholder="Search products..."
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchQuery);
              }
            }}
          />
        </div>

        {searchQuery ? (
          <div className="max-h-[60vh] overflow-auto">
            {searchResults.length > 0 ? (
              <div className="p-4 divide-y">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex justify-between py-4 hover:bg-muted/50 px-2 rounded-lg transition-colors"
                    onClick={() => onOpenChange(false)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">
                          {product.name}
                        </h4>
                        <div className="text-sm text-muted-foreground">
                          {product.variants[0].salePrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-primary font-medium">
                                {getCurrencySymbol(
                                  product.variants[0].currency
                                )}
                                {product.variants[0].salePrice}
                              </span>
                              <span className="line-through">
                                {getCurrencySymbol(
                                  product.variants[0].currency
                                )}
                                {product.variants[0].price}
                              </span>
                            </div>
                          ) : (
                            <span>
                              {getCurrencySymbol(product.variants[0].currency)}
                              {product.variants[0].price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">
                        {averageRating(product.reviews).toFixed(1)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No products found for "{searchQuery}"
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 bg-muted/40">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">
                Recent searches
              </div>
              {searchHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-primary hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            {searchHistory.length > 0 ? (
              <div className="space-y-2">
                {searchHistory.map((query, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <button
                      className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                      onClick={() => handleSearch(query)}
                    >
                      <Clock size={14} />
                      {query}
                    </button>
                    <button
                      onClick={() => removeHistoryItem(query)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X
                        size={14}
                        className="text-muted-foreground hover:text-primary"
                      />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm">No recent searches</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
