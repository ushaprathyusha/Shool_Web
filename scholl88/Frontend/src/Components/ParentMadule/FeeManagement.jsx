import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeeManagement.css';

const FeeManagement = () => {
    const [selectedTerm, setSelectedTerm] = useState('annual');
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch invoice data from backend
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/invoice/10005');
                setInvoiceData(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching invoice:', err);
                setError('Failed to load invoice data');
                setLoading(false);
            }
        };
        fetchInvoice();
    }, []);

    if (loading) {
        return <div className="fee-management-page88"><p>Loading fee details...</p></div>;
    }

    if (error) {
        return <div className="fee-management-page88"><p>{error}</p></div>;
    }

    // Extract backend data
    const student = invoiceData || {};
    const invoice = student.Invoices && student.Invoices.length > 0 ? student.Invoices[0] : null;

    // Convert API data to structure compatible with UI
    const totalFee = invoice?.TotalFee || 0;
    const paidFee = invoice?.PaidTillNow || 0;
    const pendingFee = invoice?.BalanceDue || 0;

    const feeStructure = {
        annual: {
            total: totalFee,
            paid: paidFee,
            pending: pendingFee,
        },
        term1: {
            total: totalFee / 3,
            paid: paidFee / 3,
            pending: pendingFee / 3,
            dueDate: invoice?.DueDate,
            duration: 'April 1, 2024 - June 30, 2024',
            paymentHistory: [
                { date: invoice?.InvoiceDate, description: 'Term 1 Fee', amount: paidFee / 3, method: 'Online Transfer' }
            ]
        },
        term2: {
            total: totalFee / 3,
            paid: paidFee / 3,
            pending: pendingFee / 3,
            dueDate: '2024-07-15',
            duration: 'July 1, 2024 - September 30, 2024',
            paymentHistory: [
                { date: '2024-07-10', description: 'Term 2 Fee', amount: paidFee / 3, method: 'UPI' }
            ]
        },
        term3: {
            total: totalFee / 3,
            paid: paidFee / 3,
            pending: pendingFee / 3,
            dueDate: '2024-10-15',
            duration: 'October 1, 2024 - December 31, 2024',
            paymentHistory: [
                { date: '2024-10-05', description: 'Term 3 Fee', amount: paidFee / 3, method: 'Net Banking' }
            ]
        }
    };

    const termSummary = [
        { term: 'Term 1', amount: totalFee / 3, paid: paidFee / 3, pending: pendingFee / 3, percentage: 33.3, color: '#4C3B99' },
        { term: 'Term 2', amount: totalFee / 3, paid: paidFee / 3, pending: pendingFee / 3, percentage: 33.3, color: '#6A5BE2' },
        { term: 'Term 3', amount: totalFee / 3, paid: paidFee / 3, pending: pendingFee / 3, percentage: 33.3, color: '#10B981' }
    ];

    const currentFee = feeStructure[selectedTerm];

    const overallTotal = totalFee;
    const overallPaid = paidFee;
    const overallPending = pendingFee;

    const calculatePieChart = (data) => {
        let currentAngle = -90;
        const segments = data.map((item) => {
            const angle = (item.percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;

            const startX = 50 + 40 * Math.cos(startAngle * Math.PI / 180);
            const startY = 50 + 40 * Math.sin(startAngle * Math.PI / 180);
            const endX = 50 + 40 * Math.cos(endAngle * Math.PI / 180);
            const endY = 50 + 40 * Math.sin(endAngle * Math.PI / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;

            return {
                ...item,
                path: `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`,
                startAngle,
                endAngle
            };
        });
        return segments;
    };

    const termPieSegments = calculatePieChart(termSummary);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="fee-management-page88">
            {/* Header Section */}
            <div className="page-header88">
                <div className="header-content88">
                    <h1 className="page-title88">Fee Management - {student.FullName}</h1>
                    <p className="page-subtitle88">Student ID: {student.StudentId} | Class: {student.ClassId}</p>
                </div>
            </div>

            {/* Term Selection */}
            <div className="term-selection88">
                <div className="term-buttons88">
                    <button 
                        className={`term-btn88 ${selectedTerm === 'annual' ? 'active88' : ''}`}
                        onClick={() => setSelectedTerm('annual')}
                    >
                        Annual Overview
                    </button>
                    <button 
                        className={`term-btn88 ${selectedTerm === 'term1' ? 'active88' : ''}`}
                        onClick={() => setSelectedTerm('term1')}
                    >
                        Term 1
                    </button>
                    <button 
                        className={`term-btn88 ${selectedTerm === 'term2' ? 'active88' : ''}`}
                        onClick={() => setSelectedTerm('term2')}
                    >
                        Term 2
                    </button>
                    <button 
                        className={`term-btn88 ${selectedTerm === 'term3' ? 'active88' : ''}`}
                        onClick={() => setSelectedTerm('term3')}
                    >
                        Term 3
                    </button>
                </div>
            </div>

            {/* Overall Summary */}
            <div className="fee-summary-section88">
                <div className="summary-cards88">
                    <div className="summary-card88 total-fee88">
                        <div className="card-icon88">💰</div>
                        <div className="card-content88">
                            <div className="card-amount88">₹ {overallTotal.toLocaleString()}</div>
                            <div className="card-label88">Total Annual Fee</div>
                        </div>
                    </div>
                    <div className="summary-card88 paid-fee88">
                        <div className="card-icon88">✅</div>
                        <div className="card-content88">
                            <div className="card-amount88">₹ {overallPaid.toLocaleString()}</div>
                            <div className="card-label88">Total Paid Amount</div>
                        </div>
                    </div>
                    <div className="summary-card88 pending-fee88">
                        <div className="card-icon88">⏳</div>
                        <div className="card-content88">
                            <div className="card-amount88">₹ {overallPending.toLocaleString()}</div>
                            <div className="card-label88">Total Pending Amount</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart + Term Info */}
            <div className="charts-section88">
                <div className="charts-header88"><h2>Term-wise Fee Distribution</h2></div>
                <div className="charts-container88">
                    <div className="chart-card88">
                        <div className="chart-content88">
                            <div className="pie-chart-container88">
                                <svg viewBox="0 0 100 100" className="pie-chart88">
                                    {termPieSegments.map((segment, i) => (
                                        <path key={i} d={segment.path} fill={segment.color} className="pie-segment88" />
                                    ))}
                                    <circle cx="50" cy="50" r="25" fill="white" />
                                    <text x="50" y="50" textAnchor="middle" dy="0.3em" className="pie-center-text88">
                                        ₹ {overallTotal.toLocaleString()}
                                    </text>
                                </svg>
                            </div>
                            <div className="chart-legend88">
                                {termSummary.map((term, i) => (
                                    <div key={i} className="legend-item88">
                                        <div className="legend-color88" style={{ backgroundColor: term.color }}></div>
                                        <div className="legend-details88">
                                            <span className="legend-label88">{term.term}</span>
                                            <span className="legend-value88">₹ {term.amount.toLocaleString()}</span>
                                            <span className="legend-paid88">Paid: ₹ {term.paid.toLocaleString()}</span>
                                        </div>
                                        <div className="legend-percentage88">{term.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment History (for selected term) */}
            {selectedTerm !== 'annual' && currentFee.paymentHistory && currentFee.paymentHistory.length > 0 && (
                <div className="payment-history-section88">
                    <div className="section-header88">
                        <h2>Payment History - {selectedTerm.toUpperCase()}</h2>
                        <span className="section-subtitle88">All transactions for this term</span>
                    </div>
                    <div className="payment-table-container88">
                        <table className="payment-history-table88">
                            <thead>
                                <tr>
                                    <th>Payment Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentFee.paymentHistory.map((p, i) => (
                                    <tr key={i}>
                                        <td>{formatDate(p.date)}</td>
                                        <td>{p.description}</td>
                                        <td><strong>₹ {p.amount.toLocaleString()}</strong></td>
                                        <td><span className="method-badge88">{p.method}</span></td>
                                        <td><span className="status-badge88 paid88">Paid</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeeManagement;
