import React from 'react';
import './BottomSheet.css';
import image from './graphics-card.png';
import { useNavigate } from 'react-router-dom';

function BottomSheet({ products, onClear, onCompare }) {
  const [firstProduct, secondProduct] = products;

  const isCompareEnabled = firstProduct && secondProduct;
  const navigate = useNavigate();

  const handleCompare = () => {
    if (isCompareEnabled) {
      navigate(`/compare/${firstProduct.id}/${secondProduct.id}`);
    }
  };

  return (
    <div className="bottom-sheet">
      <h3>Selecciona dos productos de la lista y luego da click en el botón para comparar.</h3>
      
      <div className="products-and-buttons">
        <div className="selected-products">
          <div className="product-box">
            {firstProduct ? (
              <>
                <div className="remove-button-container">
                  <button onClick={() => onClear(firstProduct)} className="remove-button">❌</button>
                </div>
                <img src={image} alt={firstProduct.name} className="product-image" />
                <div className="product-info">
                  <h3><strong>{firstProduct.name}</strong></h3>
                  <p>${firstProduct.price}</p>
                </div>
              </>
            ) : (
              <p>Selecciona un producto</p>
            )}
          </div>

          <div className="product-box">
            {secondProduct ? (
              <>
                <div className="remove-button-container">
                  <button onClick={() => onClear(secondProduct)} className="remove-button">❌</button>
                </div>
                <img src={image} alt={secondProduct.name} className="product-image" />
                <div className="product-info">
                  <h3><strong>{secondProduct.name}</strong></h3>
                  <p>${secondProduct.price}</p>
                </div>
              </>
            ) : (
              <p>Selecciona otro producto</p>
            )}
          </div>
        </div>

        <div className="buttons">
        <button
            onClick={handleCompare}
            className={`compare-button ${!isCompareEnabled ? 'disabled' : ''}`}
            disabled={!isCompareEnabled}
          >
            COMPARAR
          </button>
          <button onClick={() => onClear()} className="clear-button">Limpiar selección</button>
        </div>
      </div>
    </div>
  );
}

export default BottomSheet;
