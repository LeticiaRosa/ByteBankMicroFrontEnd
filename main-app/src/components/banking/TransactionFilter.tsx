import React, { useState } from "react";
import { FunnelSimple, X } from "phosphor-react";
import {
  TRANSACTION_TYPES,
  TRANSACTION_CATEGORIES,
} from "../../utils/transactionsConstants";
import Button from "../ui/form/Button";
import Input from "../ui/form/Input";
import Label from "../ui/form/Label";
import Select from "../ui/form/Select";
import Modal from "../ui/Modal";
import { FilterOptions } from "../../types/transaction";

interface TransactionFilterProps {
  onApplyFilter: (filters: FilterOptions) => void;
  onClearFilter: () => void;
  activeFilters: FilterOptions;
}

export default function TransactionFilter({
  onApplyFilter,
  onClearFilter,
  activeFilters,
}: TransactionFilterProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(activeFilters);

  const handleFilterChange = (
    key: keyof FilterOptions,
    value: string | number | undefined
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  const handleApplyFilter = () => {
    onApplyFilter(filters);
    setIsModalOpen(false);
  };

  const handleClearFilter = () => {
    setFilters({});
    onClearFilter();
    setIsModalOpen(false);
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (value) => value !== undefined && value !== ""
  );

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(
      (value) => value !== undefined && value !== ""
    ).length;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <FunnelSimple size={16} />
          Filtrar
          {hasActiveFilters && (
            <span className="bg-green text-white rounded-full px-2 py-1 text-xs">
              {getActiveFilterCount()}
            </span>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="secondary"
            onClick={onClearFilter}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Limpar filtros
          </Button>
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title="Filtrar Transações">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Transação */}
            <div className="campo">
              <Label htmlFor="filter-type">Tipo de Transação:</Label>
              <Select
                id="filter-type"
                options={TRANSACTION_TYPES}
                value={filters.type || ""}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              />
            </div>

            {/* Categoria */}
            <div className="campo">
              <Label htmlFor="filter-category">Categoria:</Label>
              <Select
                id="filter-category"
                options={TRANSACTION_CATEGORIES}
                value={filters.category || ""}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              />
            </div>

            {/* Remetente */}
            <div className="campo">
              <Label htmlFor="filter-recipient">Remetente:</Label>
              <Input
                id="filter-recipient"
                type="text"
                placeholder="Nome do remetente"
                value={filters.recipient || ""}
                onChange={(e) =>
                  handleFilterChange("recipient", e.target.value)
                }
              />
            </div>

            {/* Valor Mínimo */}
            <div className="campo">
              <Label htmlFor="filter-amount-min">Valor Mínimo:</Label>
              <Input
                id="filter-amount-min"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                value={filters.amountMin || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "amountMin",
                    parseFloat(e.target.value) || undefined
                  )
                }
              />
            </div>

            {/* Valor Máximo */}
            <div className="campo">
              <Label htmlFor="filter-amount-max">Valor Máximo:</Label>
              <Input
                id="filter-amount-max"
                type="number"
                placeholder="0,00"
                step="0.01"
                min="0"
                value={filters.amountMax || ""}
                onChange={(e) =>
                  handleFilterChange(
                    "amountMax",
                    parseFloat(e.target.value) || undefined
                  )
                }
              />
            </div>

            {/* Data De */}
            <div className="campo">
              <Label htmlFor="filter-date-from">Data De:</Label>
              <Input
                id="filter-date-from"
                type="date"
                value={filters.dateFrom || ""}
                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
              />
            </div>

            {/* Data Até */}
            <div className="campo">
              <Label htmlFor="filter-date-to">Data Até:</Label>
              <Input
                id="filter-date-to"
                type="date"
                value={filters.dateTo || ""}
                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-6 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleClearFilter}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Limpar Filtros
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={handleApplyFilter}
                className="flex items-center gap-1"
              >
                <FunnelSimple size={16} />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
